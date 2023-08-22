import fetch, { Headers } from 'node-fetch'
import ilError from '../errors/error'
import ilRatelimit from '../errors/ratelimit'
import { Snowflake } from '@infinitylist/client/dist/typings'
import { EventEmitter } from 'events'
import { PageQuery } from '../@interfaces/queries/PageQuery'
import { UserAlerts } from '../@interfaces/responses/UserAlerts'

interface Options {
    auth?: string
    disableRatelimitHandler?: boolean
    onlyEmit?: boolean
}

export class SpiderClient extends EventEmitter {
    private _options: Options

    constructor(auth: string, options: Options = {}) {
        super()

        this._options = {
            auth: auth,
            disableRatelimitHandler: options.disableRatelimitHandler,
            onlyEmit: options.onlyEmit || false,
            ...options
        }
    }

    setOptions(options: Options) {
        this._options = {
            ...this._options,
            ...options
        }
    }

    private async _request(method: string, path: string, body?: Record<string, any>): Promise<any> {
        let tries = 1

        while (tries <= 3) {
            const headers = new Headers()

            if (this._options.auth) headers.set('authorization', this._options.auth)
            if (method !== 'GET') headers.set('Content-Type', 'application/json')

            let url = `https://spider.infinitybots.gg/${path}`

            if (body && method === 'GET') url += `${new URLSearchParams(body)}`

            const response = await fetch(url, {
                method,
                headers,
                body: body && method !== 'GET' ? JSON.stringify(body) : undefined
            })

            let responseBody

            if (response.headers.get('Content-Type')?.startsWith('application/json')) {
                responseBody = await response.json()
            } else {
                responseBody = await response.text()
            }

            if (response.status == 429) {
                const retryAfter = parseFloat(response.headers.get('Retry-After') || '1000')

                const global = response.headers.get('X-Global-Ratelimit') == 'true'

                const error = new ilRatelimit(
                    response.status,
                    responseBody,
                    response,
                    () => this._request(method, path, body),
                    global
                )

                if (this._options.disableRatelimitHandler || tries === 3 || global) {
                    this.emit('ratelimit', error)
                    if (!this._options.onlyEmit) throw error
                } else {
                    this.emit('ratelimitWait', error)
                    await new Promise(r => setTimeout(r, retryAfter + 2000))
                    tries++
                    continue
                }
            }

            if (!response.ok) {
                const error = new ilError(response.status, response.statusText, response)
                this.emit('error', error)
                if (!this._options.onlyEmit) throw error
            }

            return responseBody
        }
    }

    /**
     * ALERT BASED EVENTS
     */
    public async getUserAlerts(id: Snowflake, page?: PageQuery): Promise<UserAlerts> {
        if (!id) throw new Error('please provide a valid user id!')
        if (page && typeof page !== 'number') throw new Error('page should be a valid number')

        return this._request('GET', `/users/${id}/alerts`, page).then((x: UserAlerts) => {
            return {
                count: x.count,
                per_page: x.per_page,
                results: x.results
            }
        })
    }
}
