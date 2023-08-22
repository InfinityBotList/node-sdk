import fetch from 'node-fetch'
import { Bot } from '@infinitylist/client/dist/typings'
const { prettyLogs } = require('@infinitylist/logger')

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
     * @requires servers
     */
    public async postServerCount({ servers }: Bot) {
        if (!this.apiKey) {
            return prettyLogs('Please provide a valid api token', 'error')
        } else if (!this.botID) {
            return prettyLogs('Please provide a valid discord bot id that has been approved on our list', 'error')
        } else if (!servers || typeof servers !== 'number') {
            return prettyLogs('Please provide a valid server count, should be a integer of 1 or greater!', 'error')
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
            return prettyLogs(
                'Whoops we seem to be having some issues contacting our api. Please try again later!',
                'error'
            )
        } else if (res.status !== 204 && res.status !== 200) {
            return prettyLogs(`Hold up, it looks like our api responded with a status code of ${res.status}`)
        } else {
            return prettyLogs('Hooray, your server count has been posted')
        }
    }

    /**
     * POST JUST YOUR BOTS SHARD COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires shards
     */
    public async postShardCount({ shards }: Bot) {
        if (!this.apiKey) {
            return prettyLogs('Please provide a valid api token', 'error')
        } else if (!this.botID) {
            return prettyLogs('Please provide a valid discord bot id that has been approved on our list', 'error')
        } else if (!shards || typeof shards !== 'number') {
            return prettyLogs('Please provide a valid shard count, should be a integer of 1 or greater!', 'error')
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
            return prettyLogs(
                'Whoops we seem to be having some issues contacting our api. Please try again later!',
                'error'
            )
        } else if (res.status !== 204 && res.status !== 200) {
            return prettyLogs(`Hold up, it looks like our api responded with a status code of ${res.status}`)
        } else {
            return prettyLogs('Hooray, your shard count has been posted')
        }
    }

    /**
     * POST JUST YOUR BOTS USER COUNT
     * @param apiKey Your bots infinity api token found in your bot settings
     * @param botID Your bots discord id. Can be found on the discord dev portal
     * @requires users
     */
    public async postUserCount({ users }: Bot) {
        if (!this.apiKey) {
            return prettyLogs('Please provide a valid api token', 'error')
        } else if (!this.botID) {
            return prettyLogs('Please provide a valid discord bot id that has been approved on our list', 'error')
        } else if (!users || typeof users !== 'number') {
            return prettyLogs('Please provide a valid user count, should be a integer of 1 or greater!', 'error')
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
            return prettyLogs(
                'Whoops we seem to be having some issues contacting our api. Please try again later!',
                'error'
            )
        } else if (res.status !== 204 && res.status !== 200) {
            return prettyLogs(`Hold up, it looks like our api responded with a status code of ${res.status}`)
        } else {
            return prettyLogs('Hooray, your user count has been posted')
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
            return prettyLogs('Please provide a valid api token', 'error')
        } else if (!this.botID) {
            return prettyLogs('Please provide a valid discord bot id that has been approved on our list', 'error')
        } else if (!servers || typeof servers !== 'number') {
            return prettyLogs('Please provide a valid server count, should be a integer of 1 or greater!', 'error')
        } else if (!shards || typeof shards !== 'number') {
            return prettyLogs('Please provide a valid shard count, should be a integer of 1 or greater!', 'error')
        } else if (!users || typeof users !== 'number') {
            return prettyLogs('Please provide a valid user count, should be a integer of 1 or greater!', 'error')
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
            return prettyLogs(
                'Whoops we seem to be having some issues contacting our api. Please try again later!',
                'error'
            )
        } else if (res.status !== 204 && res.status !== 200) {
            return prettyLogs(`Hold up, it looks like our api responded with a status code of ${res.status}`)
        } else {
            return prettyLogs('Hooray, your stats have been posted!')
        }
    }
}
