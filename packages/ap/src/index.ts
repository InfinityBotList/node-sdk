import { DJSAutoPoster } from './clients/djs_client'
import { BaseClient } from './clients/base'
import { AutoPoster } from './typings'

export function InfinityAutoPoster(auth: string, client: any, options?: AutoPoster): BaseClient {
    if (!auth) throw new Error("whoops, looks like you didn't provide a infinity api bot token")
    if (!client) throw new Error("whoops, looks like you didn't provide a discord.js client")

    let djs_client

    try {
        djs_client = require.cache[require.resolve('discord.js')]
    } catch (e) {
        throw new Error('unable to resolve the discord.js library')
    }

    if (djs_client && client instanceof djs_client.exports.Client) return new DJSAutoPoster(auth, client, options)

    throw new Error(
        'unsupported library detected, more info: https://github.com/InfinityBotList/node-sdk/tree/master/packages/ap/README.md'
    )
}

export { DJSAutoPoster }
export default { InfinityAutoPoster }
