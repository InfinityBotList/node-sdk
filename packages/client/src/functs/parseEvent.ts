import crypto from 'crypto'
import { ParsedEvent } from '../typings'

const supportedProtocol = 'splashtail'

const tagLength = 16
const ivLength = 12

/**
 * PARSE REQUEST EVENT
 * @param requestBody The webhook request body
 * @param webhookSecret The webhook secret
 * @param webhookNonce The webhook nonce
 * @param webhookSig The webhook signature
 * @param protocol The request protocol
 */
export const parseEvent = async function (
    requestBody: string,
    webhookSecret: string,
    webhookNonce?: string,
    webhookSig?: string,
    protocol?: string
): Promise<ParsedEvent> {
    if (protocol != supportedProtocol) {
        return {
            authorized: false,
            error: 'Invalid protocol version',
            statusCode: 403
        }
    }

    if (!webhookNonce) {
        return {
            authorized: false,
            error: 'Invalid nonce version',
            statusCode: 403
        }
    }

    if (!requestBody) {
        return {
            authorized: false,
            error: 'No request body provided',
            statusCode: 400
        }
    }

    /**
     * CREATE HMAC 512 HASH
     */
    const signedBody = crypto.createHmac('sha512', webhookSecret).update(requestBody).digest('hex')

    /**
     * CREATE THE ACTUAL WEBHOOK SIGNATURE
     * USING X-WEBHOOK-NONCE BY PERFORMING
     * A SECOND HMAC
     */
    const expectedTok = crypto.createHmac('sha512', webhookNonce).update(signedBody).digest('hex')

    if (webhookSig != expectedTok) {
        console.log(`Expected: ${expectedTok} Got: ${webhookSig}`)
        return {
            authorized: false,
            error: 'Invalid signature',
            statusCode: 403
        }
    }

    /**
     * DECRYPT THE BODY USING SHA256 OF SECRET AS KEY AND
     * AES-256-GCM AS CIPHER (THE BODY IS IN HEX FORMAT)
     */
    try {
        const hashedKey = crypto
            .createHash('sha256')
            .update(webhookSecret + webhookNonce)
            .digest()

        const enc = Buffer.from(requestBody, 'hex')
        const tag = enc.subarray(enc.length - tagLength, enc.length)
        const iv = enc.subarray(0, ivLength)
        const toDecrypt = enc.subarray(ivLength, enc.length - tag.length)
        const decipher = crypto.createDecipheriv('aes-256-gcm', hashedKey, iv)
        decipher.setAuthTag(tag)
        const res = Buffer.concat([decipher.update(toDecrypt), decipher.final()])

        /**
         * PARSE THE DECRYPTED BODY
         */
        const data = JSON.parse(res.toString('utf-8'))

        if (data.created_at == undefined) {
            return {
                authorized: false,
                error: 'Invalid body',
                statusCode: 400
            }
        }

        console.log(data)

        return {
            authorized: true,
            error: '',
            statusCode: 200,
            output: data
        }
    } catch (err) {
        console.error(err)
        return {
            authorized: false,
            error: 'Invalid body',
            statusCode: 400
        }
    }
}
