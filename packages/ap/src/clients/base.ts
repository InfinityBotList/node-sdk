import { InfinityBots } from '@infinitylist/client'
import { EventEmitter } from '@infinitylist/emitter'
import { BotStats } from '@infinitylist/client/dist/typings'
import { AutoPoster } from '../typings'

export interface BaseClientInterface {
    getStats: () => Promise<BotStats>
    clientReady: () => boolean | Promise<boolean>
    waitForReady: (fn: () => void) => void
}

export class BaseClient extends EventEmitter<{ posted: BotStats; error: Error }> {
    private _options: AutoPoster
    private _binds: BaseClientInterface
    private _api: InfinityBots

    public _started: boolean
    public _interval: NodeJS.Timeout

    constructor(auth: string, options?: AutoPoster) {
        super()

        this._options = options
        this._started = false

        if (!options) options = {}

        this._options = {
            interval: options.interval ?? 300000,
            postOnStart: options.postOnStart ?? true,
            startPosting: options.startPosting ?? true,
            api: options.api
        }

        if (this._options.interval < 299999) {
            throw new Error('hold up, your interval should be greater then 300000 (5 minutes)')
        }

        this._api = this._options.api || new InfinityBots(auth)
    }

    public async _binder(binds: BaseClientInterface) {
        this._binds = binds

        if (this._options.startPosting) {
            if (await this._binds.clientReady()) {
                this._start()
            } else {
                this._binds.waitForReady(() => {
                    this._start()
                })
            }
        }
    }

    public _start() {
        this._started = true
        this._setupInterval()
    }

    public _stop() {
        this._started = false
        clearInterval(this._interval)

        this._interval = null
    }

    private _setupInterval() {
        if (this._options.postOnStart) {
            setTimeout(() => {
                this._post()
            }, 5000)
        }

        this._interval = setInterval(async () => {
            if (!(await this._binds.clientReady())) return
            this._post()
        }, this._options.interval)
    }

    public async _post() {
        this._api
            .postBotStats(await this._binds.getStats())
            .then(data => this.emit('posted', data))
            .catch(e => (this.eventNames().includes('error') ? this.emit('error', e) : console.error(e)))
    }
}
