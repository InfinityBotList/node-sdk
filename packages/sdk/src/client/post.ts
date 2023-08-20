import fetch from 'node-fetch'
import { log } from '../plugins/Logger'
import { Bot } from '../typings'

export default class InfinityPoster {
    private apiKey: string
    public botID: string
    public url: string

    constructor(
        options = {
            auth: '',
            botID: '',
            url: 'https://spider.infinitybots.gg'
        }
    ) {
        this.apiKey = options.auth
        this.botID = options.botID
        this.url = options.url
    }

    /**
     * POST JUST YOUR BOTS SERVER COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires servers The server count of your bot/client.
     */
    public async postServerCount({ servers }: Bot) {
        if (!this.apiKey) {
            return log('Please provide a valid bot api token', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!this.botID) {
            return log('Please provide a valid bot id', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!servers || typeof servers !== 'number') {
            return log('Please provide a valid server count, should be a integer of 1 or greater!', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        }

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
            return log('Whoops, we seem to be having some issues contacting our api. Please try again later!', {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        }

        if (res.status !== 204 && res.status !== 200) {
            return log(`Hold up, it looks like our api responded with a status code of: ${res.status}`, {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        } else {
            return log('Hooray, your server count has been posted!', {
                header: '@INFINITYBOTS/NODE-SDK: STATS_POST',
                type: 'success'
            })
        }
    }

    /**
     * POST JUST YOUR BOTS SHARD COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires shards The shard count of your bot/client.
     */
    public async postShardCount({ shards }: Bot) {
        if (!this.apiKey) {
            return log('Please provide a valid bot api token', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!this.botID) {
            return log('Please provide a valid bot id', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!shards || typeof shards !== 'number') {
            return log('Please provide a valid shard count, should be a integer of 1 or greater!', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        }

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
            return log('Whoops, we seem to be having some issues contacting our api. Please try again later!', {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        }

        if (res.status !== 204 && res.status !== 200) {
            return log(`Hold up, it looks like our api responded with a status code of: ${res.status}`, {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        } else {
            return log('Hooray, your shard count has been posted!', {
                header: '@INFINITYBOTS/NODE-SDK: STATS_POST',
                type: 'success'
            })
        }
    }

    /**
     * POST JUST YOUR BOTS USER COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires users The user count of your bot/client.
     */
    public async postUserCount({ users }: Bot) {
        if (!this.apiKey) {
            return log('Please provide a valid bot api token', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!this.botID) {
            return log('Please provide a valid bot id', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!users || typeof users !== 'number') {
            return log('Please provide a valid user count, should be a integer of 1 or greater!', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        }

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
            return log('Whoops, we seem to be having some issues contacting our api. Please try again later!', {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        }

        if (res.status !== 204 && res.status !== 200) {
            return log(`Hold up, it looks like our api responded with a status code of: ${res.status}`, {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        } else {
            return log('Hooray, your user count has been posted!', {
                header: '@INFINITYBOTS/NODE-SDK: STATS_POST',
                type: 'success'
            })
        }
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
        if (!this.apiKey) {
            return log('Please provide a valid bot api token', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!this.botID) {
            return log('Please provide a valid bot id', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!servers || typeof servers !== 'number') {
            return log('Please provide a valid server count, should be a integer of 1 or greater!', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!shards || typeof shards !== 'number') {
            return log('Please provide a valid shard count, should be a integer of 1 or greater!', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        } else if (!users || typeof users !== 'number') {
            return log('Please provide a valid user count, should be a integer of 1 or greater!', {
                header: '@INFINITYBOTS/NODE-SDK: REFERENCE_ERROR',
                type: 'error'
            })
        }

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
            return log('Whoops, we seem to be having some issues contacting our api. Please try again later!', {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        }

        if (res.status !== 204 && res.status !== 200) {
            return log(`Hold up, it looks like our api responded with a status code of: ${res.status}`, {
                header: '@INFINITYBOTS/NODE-SDK: SPIDER_REQUEST_FAILURE',
                type: 'error'
            })
        } else {
            return log('Hooray, your stats have been posted!', {
                header: '@INFINITYBOTS/NODE-SDK: STATS_POST',
                type: 'success'
            })
        }
    }
}
