export type Snowflake = string

export interface BotInformation {
    additional_owners?: string[]
    announce?: boolean
    announce_message?: string
    approval_note?: string
    avatar?: string
    banner?: string
    bot_id?: string
    cert_reason?: string
    certified?: boolean
    claimed?: boolean
    claimed_by?: string
    cross_add?: boolean
    date?: string | number
    donate?: string
    external_source?: string
    github?: string
    invite?: string
    invites?: number
    library?: string
    list_source?: string
    long?: string
    name?: string
    nsfw?: boolean
    owner?: string
    pending_cert?: boolean
    prefix?: string
    premium?: boolean
    premium_period_length?: number
    servers?: number
    shards?: number
    short?: string
    staff_bot?: boolean
    start_premium_period?: number
    support?: string
    tags?: string[]
    total_uptime?: number
    type?: string
    uptime?: number
    users?: number
    vanity?: string
    views?: number
    vote_banned?: boolean
    votes?: number
    website?: string
}

export interface BotStatistics {
    servers?: number
    shards?: number
    users?: number
}

export interface ParsedEvent {
    authorized: boolean
    error: string
    statusCode: number
    output?: any
}

export interface UserInformation {
    nickname: string
    about: string
    certified_dev: boolean
    staff: boolean
    developer: boolean
    links: {
        website: string
        github: string
    }
}

export interface VoteInformation {
    bot_votes: [
        {
            _id: string
            userID: Snowflake
            botID: Snowflake
            date: string
            __v: number
        }
    ]
}

export interface DiscordUser {
    id: Snowflake
    username: string
    discriminator: string
    avatar: string
    bot: boolean
    mention: string
    status: string
    system: boolean
    nickname?: string
    in_guild?: string
    flags?: number
    tag: string
}

export interface ReedhookPayload {
    created_at?: number
    creator: {
        avatar?: string
        bot?: boolean
        discriminator?: string
        id?: Snowflake
        in_guild?: string
        nickname?: string
        status?: string
        username?: string
    }
    data: {
        test?: boolean
        votes?: number
    }
    targets: {
        bot: {
            avatar?: string
            bot?: boolean
            discriminator?: string
            id?: Snowflake
            in_guild?: string
            nickname?: string
            status?: string
            username?: string
        }
    }
    type?: string
    query:
        | {
              [key: string]: string
          }
        | string
}

declare module 'express' {
    export interface Request {
        voteData?: ReedhookPayload
    }
}

export interface WebhookPayload {
    test?: boolean
    user?: Snowflake
    userID?: Snowflake
    userName?: string
    count?: number
    type?: string
    timeStamp?: number
    userObj?: DiscordUser
    botID?: Snowflake
    votes?: number
    time?: number
    query:
        | {
              [key: string]: string
          }
        | string
}

declare module 'express' {
    export interface Request {
        vote?: WebhookPayload
    }
}
