import { IOptions, IOutage, IUp, config } from './typings'
import { log } from '@infinitylist/ipm/dist/lib/consoleLogs'
import { EventEmitter } from 'events'
import fetch from 'node-fetch'

export class UptimeClient extends EventEmitter {
    public url: string
    public interval: number = config.default.interval
    public retries: number = config.default.retries
    public timeout: number = config.default.timeout
    public headers: { [key: string]: string } | undefined = config.default.headers
    public available: boolean | null = config.default.available
    public uptime: number | null = config.default.uptime
    public ping: number | null = config.default.ping
    public unavailability: number | null = config.default.unavailability

    private startTime: number = Date.now()
    private lastSuccessCheck: number = Date.now()
    private intervalFunction: any
    private failures: number = config.default.failures

    constructor(url: string, options?: IOptions) {
        super()

        if (!url)
            throw new Error('[@infinitylist/uptime]: invalid url provided, please check the provided url and try again')

        this.url = url

        if (options) {
            if (options.interval) {
                if (typeof options.interval !== 'number')
                    throw new TypeError('[@infinitylist/uptime]: interval should be a valid integer')
                if (options.interval < config.minInterval)
                    throw new RangeError(
                        `[@infinitylist/uptime]: interval should be greater then ${config.minInterval}ms`
                    )
                this.interval = options.interval
            }

            if (options.retries) {
                if (typeof options.retries !== 'number')
                    throw new TypeError('[@infinitylist/uptime]: retries should be a valid integer')
                if (options.retries < config.default.retries)
                    throw new RangeError(
                        `[@infinitylist/uptime]: retries should be greater then ${config.default.retries}`
                    )
                this.retries = options.retries
            }

            if (options.timeout) {
                if (typeof options.timeout !== 'number')
                    throw new TypeError('[@infinitylist/uptime]: timeout should be a valid integer')
                if (options.timeout < config.default.timeout)
                    throw new RangeError(
                        `[@infinitylist/uptime]: timeout should be greater then ${config.default.timeout}ms`
                    )
                this.timeout = options.timeout
            }

            if (options.headers) {
                if (typeof options.headers !== 'object')
                    throw new TypeError('[@infinitylist/uptime]: headers should be a valid object')
                this.headers = options.headers
            }
        }
    }

    private _fetchURL() {
        const startPing: number = Date.now()
        const timeout: Promise<Error> = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('timeout'))
            }, this.timeout)
        })

        const fetchFunction = new Promise((resolve, reject) => {
            fetch(this.url, { headers: this.headers })
                .then(res => {
                    resolve({
                        statusCode: res.status,
                        statusText: res.statusText,
                        ping: Date.now() - startPing
                    })
                })
                .catch(e => reject(e))
        })

        Promise.race([fetchFunction, timeout])
            .then((result: any) => {
                this.ping = result.ping

                if (result.statusCode > 299) {
                    this.failures++
                    log.error(`[@infinitylist/uptime]: monitor failure: ${this.failures}`)

                    if (this.failures > this.retries) {
                        this._emitOutage(result.statusCode, result.statusText)
                    }
                } else {
                    this.failures = 0
                    this.available = true
                    this.uptime = Date.now() - this.startTime
                    this.lastSuccessCheck = Date.now()

                    this._emitUp(result.statusCode, result.statusText)
                }
            })
            .catch(e => {
                if (e.message.match('timeout')) {
                    this.failures++
                    log.error(`[@infinitylist/uptime]: monitor failure: ${this.failures}`)

                    if (this.failures > this.retries) {
                        this._emitOutage(undefined, 'timeout')
                    }
                } else {
                    if (e.message.match('Only absolute URLs are supported'))
                        return this.emit('error', TypeError('[@infinitylist/uptime]: only absolute urls are supported'))
                    if (e.message.match('ECONNREFUSED'))
                        return this.emit(
                            'error',
                            TypeError(`[@infinitylist/client]: unknown host: ${this.url} connection refused`)
                        )

                    this.emit('error', e)
                }
            })
    }

    private _emitOutage(statusCode?: number, statusText?: string) {
        this.available = false
        this.unavailability = Date.now() - this.lastSuccessCheck

        const outage: IOutage = {
            type: 'outage',
            statusCode: statusCode || undefined,
            statusText: statusText || undefined,
            unavailability: this.unavailability,
            ping: this.ping,
            url: this.url
        }

        this.emit('outage', outage)
    }

    private _emitUp(statusCode?: number, statusText?: string) {
        this.available = true
        this.unavailability = Date.now() - this.lastSuccessCheck

        const up: IUp = {
            type: 'up',
            statusCode: statusCode || undefined,
            statusText: statusText || undefined,
            uptime: this.uptime,
            ping: this.ping,
            url: this.url
        }

        this.emit('up', up)
    }

    _setInterval(newInterval: number): boolean {
        if (!newInterval)
            throw new Error(
                `[@infinitylist/uptime]: please provide a valid interval, should be a integer greater then ${config.minInterval}`
            )
        if (newInterval < config.minInterval)
            throw new RangeError(`[@infinitylist/uptime]: interval should be greater then ${config.minInterval}`)
        this.interval = newInterval
        return true
    }

    _setURL(newURL: string | number): boolean {
        if (!newURL) throw new Error('[@infinitylist/uptime]: please provide a valid url to monitor')
        if (typeof newURL !== 'string') throw new TypeError('[@infinitylist/uptime]: new url should be a valid string')
        this.url = newURL
        return true
    }

    _start(): boolean {
        if (!this.url) throw new Error('[@infinitylist/uptime]: please provide a valid url to monitor')
        this.intervalFunction = setInterval(() => {
            this._fetchURL()
        }, this.interval)
        return true
    }

    _restart(): boolean {
        clearInterval(this.intervalFunction)
        this.emit('restart')
        this._start()
        return true
    }

    _stop(): boolean {
        clearInterval(this.intervalFunction)
        this.emit('stopped', { reason: 'stopped by client' })
        return true
    }

    get infos() {
        return {
            url: this.url,
            interval: this.interval,
            timeout: this.timeout,
            available: this.available,
            unavailability: this.unavailability,
            uptime: this.uptime,
            ping: this.ping
        }
    }
}
