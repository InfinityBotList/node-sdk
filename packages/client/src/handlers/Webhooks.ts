import getBody from 'raw-body'
import { Request, Response, NextFunction } from 'express'
import { WebhookPayload } from '../typings'
import { URLSearchParams } from 'url'

export interface WebhookOptions {
    error?: (error: Error) => void | Promise<void>
}

export class Webhook {
    public options: WebhookOptions

    constructor(
        private auth?: string,
        options: WebhookOptions = {}
    ) {
        this.options = {
            error: options.error ?? console.error
        }
    }

    private _formatIncoming(body: WebhookPayload & { query: string }): WebhookPayload {
        const out: WebhookPayload = { ...body }

        if (body?.query?.length > 0) out.query = Object.fromEntries(new URLSearchParams(body.query))

        return out
    }

    private _parseRequest(req: Request, res: Response): Promise<WebhookPayload | false> {
        return new Promise(resolve => {
            if (this.auth && req.headers.authorization !== this.auth) {
                return res.status(403).json({ error: 'Unauthorized' })
            }

            if (req.body) return resolve(this._formatIncoming(req.body))

            getBody(req, {}, (error, body) => {
                if (error) return res.status(422).json({ error: 'Malformed Request' })

                try {
                    const parsed = JSON.parse(body.toString('utf8'))

                    resolve(this._formatIncoming(parsed))
                } catch (err) {
                    res.status(400).json({ error: 'Invalid Request Body' })

                    resolve(false)
                }
            })
        })
    }

    public hookListener(
        fn: (payload: WebhookPayload, req?: Request, res?: Response, next?: NextFunction) => void | Promise<void>
    ) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const response = await this._parseRequest(req, res)

            if (!response) return

            // Some patches
            response.userName = response.userObj?.username
            response.count = response.votes
            if (response.test) {
                response.type = 'TEST'
            } else {
                response.type = 'VOTE'
            }
            response.timeStamp = (response.time || 0) * 1000

            try {
                await fn(response, req, res, next)

                if (res.headersSent) {
                    res.sendStatus(204)
                }
            } catch (err) {
                console.error(err)

                res.sendStatus(500)
            }
        }
    }

    public middleware() {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const response = await this._parseRequest(req, res)

            if (!response) return

            res.sendStatus(204)

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore deprecated unsafe assignment
            req.vote = response

            next()
        }
    }
}
