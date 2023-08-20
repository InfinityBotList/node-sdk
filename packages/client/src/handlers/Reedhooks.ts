import { Request, Response, NextFunction } from 'express'
import { ReedhookPayload } from '../typings'
import { parseEvent } from '../functs/parseEvent'

export interface ReedhookOptions {
    error?: (error: Error) => void | Promise<void>
}

export class Reedhook {
    public options: ReedhookOptions

    constructor(
        private webhookSecret?: string,
        options: ReedhookOptions = {}
    ) {
        this.options = {
            error: options?.error ?? console.error
        }
    }

    public hookListener(
        fn: (payload: ReedhookPayload, req?: Request, res?: Response, next?: NextFunction) => void | Promise<void>
    ) {
        return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const resp = await parseEvent(
                req.body,
                `${this.webhookSecret}`,
                (req.headers['x-webhook-nonce'] || '').toString(),
                (req.headers['x-webhook-signature'] || '').toString(),
                (req.headers['x-webhook-protocol'] || '').toString()
            )

            if (!resp.authorized) {
                res.status(res.statusCode).send({
                    message: resp.error,
                    error: true
                })

                return
            }

            try {
                await fn(resp.output, req, res, next)

                res.status(204).send('')

                if (res.headersSent) {
                    res.status(204).send('Success')
                }
            } catch (err) {
                console.error(err)

                res.status(500).send(err)
            }
        }
    }
}
