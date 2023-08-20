import fetch, { Headers } from 'node-fetch'
import InfinityError from '../errors/error'
import InfinityRatelimit from '../errors/ratelimit'
import { EventEmitter } from 'events'

import { BotStatistics } from '../typings'

interface InfinityOptions {
    auth?: string
    disableRatelimitHandler?: boolean
    onlyEmit?: boolean
}

export class InfinityBots extends EventEmitter {
    private options: InfinityOptions

    constructor(auth: string, options: InfinityOptions = {}) {
        super()

        this.options = {
            auth: auth,
            disableRatelimitHandler: options.disableRatelimitHandler || false,
            onlyEmit: options.onlyEmit || false,
            ...options
        }
    }

    /**
     * Update options passed to client
     */
    setOptions(options: InfinityOptions) {
        this.options = {
            ...this.options,
            ...options
        }
    }

    /**
     * The Base Request (PRIVATE)
     */
    private async _request(method: string, path: string, body?: Record<string, any>): Promise<any> {
        let tries = 1

        while (tries <= 3) {
            const headers = new Headers()

            if (this.options.auth) headers.set('authorization', this.options.auth)
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
                // Handle a 429 ratelimit
                const retryAfter = parseFloat(response.headers.get('Retry-After') || '1000')

                const global = response.headers.get('X-Global-Ratelimit') == 'true'

                const error = new InfinityRatelimit(
                    response.status,
                    responseBody,
                    response,
                    () => this._request(method, path, body),
                    global
                )

                if (this.options.disableRatelimitHandler || tries === 3 || global) {
                    this.emit('ratelimit', error)
                    if (!this.options.onlyEmit) throw error
                } else {
                    this.emit('ratelimitWait', error)
                    await new Promise(r => setTimeout(r, retryAfter + 2000))
                    tries++
                    continue
                }
            }

            if (!response.ok) {
                const error = new InfinityError(response.status, response.statusText, response)
                this.emit('error', error)
                if (!this.options.onlyEmit) throw error
            }

            return responseBody
        }
    }

    public async postBotStats(stats: BotStatistics): Promise<BotStatistics> {
        if (!stats) {
            throw new Error('[Infinity API] No Stats provided, Please provide a valid Client Server and Shard Count')
        }

        /* eslint-disable camelcase */
        await this._request('POST', 'bots/stats', {
            servers: stats.servers || 0,
            shards: stats.shards || 0,
            user_count: stats.users || 0
        })

        /* eslint-enable camelcase */

        return stats
    }
}
