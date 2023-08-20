import { InfinityBots } from '@infinitylist/client'

export interface AutoPostOptions {
    /**
     * Interval of time to post stats in.
     * @default 300000
     */
    interval?: number
    /**
     * Post when the interval expires (true or false)
     * @default true
     */
    postAtInterval?: boolean
    /**
     * Begin posting immediately (if false poster will default to 5 minutes)
     * @default true
     */
    startNow?: boolean
    /**
     * Call to our main post client
     * @default InfinityBots
     */
    api?: InfinityBots
}
