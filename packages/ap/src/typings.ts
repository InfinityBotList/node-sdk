import { InfinityBots } from '@infinitylist/client'

export interface AutoPoster {
    /**
     * Interval at which to post
     * @default 300000
     */
    interval?: number
    /**
     * Whether or not to post when the interval starts
     * @default true
     */
    postOnStart?: boolean
    /**
     * Whether or not to begin posting right away.
     * if this is off you need to run `start()`
     * @default false
     */
    startPosting?: boolean
    /**
     * Alternate source specifically for testing.
     */
    api?: InfinityBots
}
