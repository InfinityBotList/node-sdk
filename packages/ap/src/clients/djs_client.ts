import { BaseClient, BaseClientInterface } from './base'
import { BotStats } from '@infinitylist/client/dist/typings'
import { AutoPoster } from '../typings'
import { Client } from 'discord.js'

export class DJSAutoPoster extends BaseClient implements BaseClientInterface {
    private _client: Client

    constructor(auth: string, client: any, options?: AutoPoster) {
        if (!auth) throw new Error("whoops, looks like you didn't provide a infinity api bot token")
        if (!client) throw new Error("whoops, looks like you didn't provide a discord.js client")
        if (!(client instanceof Client)) throw new Error("whoops, you didn't provide a valid discord.js client")

        super(auth, options)

        this._client = client

        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: fn => this.waitForReady(fn),
            getStats: () => this.getStats()
        })
    }

    public clientReady(): boolean {
        return this._client.ws.status === 0
    }

    public waitForReady(fn: () => void) {
        this._client.once('ready', () => {
            fn()
        })
    }

    public async getStats(): Promise<BotStats> {
        return {
            users: this._client.users.cache.size,
            servers: this._client.guilds.cache.size,
            shards: this._client.options.shardCount ? this._client.options.shardCount : 0,
            shard_list: this._client.shard.ids
        }
    }
}
