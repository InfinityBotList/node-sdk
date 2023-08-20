import { BaseClient, BaseClientInterface } from './BaseClient'
import { BotStatistics } from '@infinitylist/client/dist/typings'
import { AutoPostOptions } from '../typings'
import { Client } from 'discord.js'

export class DJSClient extends BaseClient implements BaseClientInterface {
    private client: Client

    constructor(auth: string, client: any, options?: AutoPostOptions) {
        const Discord = require('discord.js')

        if (!auth)
            throw new Error(
                '[@infinitylist/autoposter]: auth token not found, please provide a valid token or generate a new one'
            )
        if (!client)
            throw new Error(
                `[@infinitylist/autoposter]: client not found, please provide a valid discord.js v${
                    require('discord.js').version
                } client`
            )

        if (!(client instanceof Discord.Client))
            throw new Error(
                `[@infinitylist/autoposter]: please provide a valid discord.js v${require('discord.js').version} client`
            )

        super(auth, options)

        this.client = client

        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: fn => this.waitForReady(fn),
            getStats: () => this.getStats()
        })
    }

    public clientReady(): boolean {
        return this.client.ws.status === 0
    }

    public waitForReady(fn: () => void) {
        this.client.once('ready', () => {
            fn()
        })
    }

    public async getStats(): Promise<BotStatistics> {
        return {
            servers: this.client.guilds.cache.size,
            shards: this.client.options.shardCount,
            users: this.client.users.cache.size
        }
    }
}
