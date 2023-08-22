import fetch from 'node-fetch'
import { Bot } from '@infinitylist/client/dist/typings'
import { log } from '@infinitylist/ipm/dist/lib/consoleLogs'

export default class InfinityPoster {
    private apiKey: string
    public botID: string
    public url: string

    constructor(
        options = {
            auth: '',
            botID: ''
        }
    ) {
        this.apiKey = options.auth
        this.botID = options.botID
    }

    /**
     * POST JUST YOUR BOTS SERVER COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires servers
     */
    public async postServerCount({ servers }: Bot) {
        if (!this.apiKey) throw new ReferenceError('[@infinitylist/sdk]: please provide a valid infinity api bot token')
        else if (!this.botID || typeof this.botID === 'string')
            throw new ReferenceError('[@infinitylist/sdk]: please provide a valid discord bot id')
        else if (!servers || typeof servers !== 'number')
            throw new ReferenceError(
                '[@infinitylist/sdk]: please provide a valid server count, should be a valid integer of 1 or greater!'
            )

        const res = await fetch('https://spider.infinitybots.gg/bots/stats', {
            method: 'POST',
            headers: {
                'Authorization': `${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                servers: servers
            })
        })

        if (!res.ok) {
            throw new Error(
                '[@infinitylist/sdk]: Whoops we seem to be having some issues contacting our api. Please try again later!'
            )
        }

        if (res.status !== 204 && res.status !== 200) {
            throw new Error(
                `[@infinitylist/sdk]: Hold up, it looks like our api responded with a status code of ${res.status}`
            )
        }

        return log.success('[@infinitylist/sdk]: Hooray, your server count has been posted!')
    }

    /**
     * POST JUST YOUR BOTS SHARD COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires shards
     */
    public async postShardCount({ shards }: Bot) {
        if (!this.apiKey) throw new ReferenceError('[@infinitylist/sdk]: please provide a valid infinity api bot token')
        else if (!this.botID || typeof this.botID === 'string')
            throw new ReferenceError('[@infinitylist/sdk]: please provide a valid discord bot id')
        else if (!shards || typeof shards !== 'number')
            throw new ReferenceError(
                '[@infinitylist/sdk]: please provide a valid shard count, should be a valid integer of 1 or greater!'
            )

        const res = await fetch('https://spider.infinitybots.gg/bots/stats', {
            method: 'POST',
            headers: {
                'Authorization': `${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shards: shards
            })
        })

        if (!res.ok) {
            throw new Error(
                '[@infinitylist/sdk]: Whoops we seem to be having some issues contacting our api. Please try again later!'
            )
        }

        if (res.status !== 204 && res.status !== 200) {
            throw new Error(
                `[@infinitylist/sdk]: Hold up, it looks like our api responded with a status code of ${res.status}`
            )
        }

        return log.success('[@infinitylist/sdk]: Hooray, your shard count has been posted!')
    }

    /**
     * POST JUST YOUR BOTS USER COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires users
     */
    public async postUserCount({ users }: Bot) {
        if (!this.apiKey) throw new ReferenceError('[@infinitylist/sdk]: please provide a valid infinity api bot token')
        else if (!this.botID || typeof this.botID === 'string')
            throw new ReferenceError('[@infinitylist/sdk]: please provide a valid discord bot id')
        else if (!users || typeof users !== 'number')
            throw new ReferenceError(
                '[@infinitylist/sdk]: please provide a valid user count, should be a valid integer of 1 or greater!'
            )

        const res = await fetch('https://spider.infinitybots.gg/bots/stats', {
            method: 'POST',
            headers: {
                'Authorization': `${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                users: users
            })
        })

        if (!res.ok) {
            throw new Error(
                '[@infinitylist/sdk]: Whoops we seem to be having some issues contacting our api. Please try again later!'
            )
        }

        if (res.status !== 204 && res.status !== 200) {
            throw new Error(
                `[@infinitylist/sdk]: Hold up, it looks like our api responded with a status code of ${res.status}`
            )
        }

        return log.success('[@infinitylist/sdk]: Hooray, your user count has been posted!')
    }

    /**
     * POST YOUR BOTS STATS
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires servers The server count of your bot/client.
     * @requires shards The shard count of your bot/client.
     * @requires users The user count of your bot/client.
     */
    public async postBotStats({ servers, shards, users }: Bot) {
        if (!this.apiKey) throw new ReferenceError('[@infinitylist/sdk]: please provide a valid infinity api bot token')
        else if (!this.botID || typeof this.botID === 'string')
            throw new ReferenceError('[@infinitylist/sdk]: please provide a valid discord bot id')
        else if (!servers || typeof servers !== 'number')
            throw new ReferenceError(
                '[@infinitylist/sdk]: please provide a valid server count, should be a valid integer of 1 or greater!'
            )
        else if (!shards || typeof shards !== 'number')
            throw new ReferenceError(
                '[@infinitylist/sdk]: please provide a valid shard count, should be a valid integer of 1 or greater!'
            )
        else if (!users || typeof users !== 'number')
            throw new ReferenceError(
                '[@infinitylist/sdk]: please provide a valid user count, should be a valid integer of 1 or greater!'
            )

        const res = await fetch('https://spider.infinitybots.gg/bots/stats', {
            method: 'POST',
            headers: {
                'Authorization': `${this.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                servers: servers,
                shards: shards,
                users: users
            })
        })

        if (!res.ok) {
            throw new Error('Whoops we seem to be having some issues contacting our api. Please try again later!')
        }

        if (res.status !== 204 && res.status !== 200) {
            throw new Error(
                `[@infinitylist/sdk]: Hold up, it looks like our api responded with a status code of ${res.status}`
            )
        }

        return log.success('[@infinitylist/sdk]: Hooray, your stats have been posted!')
    }
}
