import { Response } from 'node-fetch'

export default class infinityRatelimit extends Error {
    public status: number
    public error: any
    public response: Response
    public global: boolean

    private _retry: () => Promise<any>

    constructor(status: number, respBody: any, response: Response, retry: () => Promise<any>, global: boolean) {
        super(`${status}: ${respBody.message || respBody}`)

        this.error = respBody.message || respBody

        this.status = status

        this.response = response

        this.global = global

        this._retry = retry
    }

    public async retry() {
        if (global) {
            const waitFor = this.retryAfter()
            throw new Error(`Global Ratelimit Exceeded. Wait ${waitFor} seconds`)
        }
        await new Promise(r => setTimeout(r, this.retryAfter()))
        return await this._retry()
    }

    public retryAfter() {
        return parseFloat(this.response.headers.get('Retry-After') || '1000') + 2000
    }
}
