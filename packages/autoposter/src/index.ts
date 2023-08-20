import { DJSClient } from './clients/DJSClient'
import { BaseClient } from './clients/BaseClient'
import { AutoPostOptions } from './typings'

export function InfinityAutoPoster(auth: string, client: any, options?: AutoPostOptions): BaseClient {
    if (!auth) throw new Error('[@infinitylist/autoposter]: no auth token provided.')
    if (!client) throw new Error('[@infinitylist/autoposter]: no client provided')

    let djs

    try {
        djs = require.cache[require.resolve('discord.js')]
    } catch (err) {
        throw new Error(`[@infinitylist/autoposter]: ${err.stack}`)
    }

    if (djs && client instanceof djs.exports.Client) return new DJSClient(auth, client, options)

    throw new Error(
        '[@infinitylist/autoposter]: you are using a unsupported library, currently our supported library(s) are "discord.js"'
    )
}

export { DJSClient } from './clients/DJSClient'

export default InfinityAutoPoster
