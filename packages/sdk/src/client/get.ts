import fetch from 'node-fetch'

export default class InfinityFetcher {
    private apiKey: string
    public botID: string

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
     * GET USER VOTE INFORMATION
     * @param userID the discord user id to fetch vote info for
     * @param botID the discord bot id to fetch vote data for
     * =================================================
     */
    public async getUserVotes(userID?: string) {
        if (!userID || typeof userID !== 'string')
            throw new ReferenceError('[@infinitylist/sdk]: please provide a valid user id')
        else if (!this.botID || typeof this.botID !== 'string')
            throw new ReferenceError('[@infinitylist/sdk]: Please provide a valid discord bot id')

        const res = await fetch(`https://spider.infinitybots.gg/users/${userID}/bots/${this.botID}/votes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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

        const voteData = await res.json()

        return {
            has_voted: voteData.has_voted,
            valid_votes: voteData.valid_votes,
            vote_info: voteData.vote_info,
            wait: voteData.wait
        }
    }

    /**
     * GET BOT INFORMATION
     * @param botID the discord bot id to fetch info for
     * =================================================
     */
    public async getBotInfo() {
        if (!this.botID)
            throw new ReferenceError('[@infinitylist/sdk]: no client id provided, please provide a bot id!')

        const res = await fetch(`https://spider.infinitybots.gg/bots/${this.botID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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

        const botData = await res.json()

        return {
            bot_id: botData.bot_id,
            client_id: botData.client_id,
            banner: botData.banner,
            invite: botData.invite,
            owner: botData.owner,
            state: botData.type,
            team: botData.team_owner,
            perks: {
                certified: botData.certified,
                captchas: botData.captcha_opt_out
            },
            stats: {
                invites: botData.invite_clicks,
                unique_views: botData.unique_clicks,
                total_views: botData.clicks,
                guild_count: botData.servers,
                shard_count: botData.shards,
                vote_count: botData.votes,
                user_count: botData.users
            }
        }
    }
}
