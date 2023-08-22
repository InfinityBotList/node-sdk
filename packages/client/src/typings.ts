export type Snowflake = string
export type WebhookType = string
export type UserExperiment = string
export type AlertType = string
export type AlertPriority = number
export type PlatformStatus = string
export type TagMode = string

export const AlertTypeSuccess: AlertType = 'success'
export const AlertTypeError: AlertType = 'error'
export const AlertTypeInfo: AlertType = 'info'
export const AlertTypeWarning: AlertType = 'warning'
export const AlertPriorityLow: AlertPriority = 0
export const AlertPriorityMedium: AlertPriority = 1
export const AlertPriorityHigh: AlertPriority = 2
export const PlatformStatusOnline: PlatformStatus = 'online'
export const PlatformStatusIdle: PlatformStatus = 'idle'
export const PlatformStatusDoNotDisturb: PlatformStatus = 'dnd'
export const PlatformStatusOffline: PlatformStatus = 'offline'
export const WebhookTypeText: WebhookType = 'text'
export const WebhookTypeNumber: WebhookType = 'number'
export const WebhookTypeChangeset: WebhookType = 'changeset'
export const ServerListingUserExperiment: UserExperiment = 'SERVER_LISTING'
export const WebhookTypeBoolean: WebhookType = 'boolean'
export const TagModeAll: TagMode = '@>'
export const TagModeAny: TagMode = '&&'

export interface Alert {
    itag: string
    url: string | null
    message: string
    type: AlertType
    title: string
    created_at: string | null
    acked: boolean
    alert_data: { [key: string]: any }
    icon: string
    priority: AlertPriority
}
export interface AlertList {
    unacked_count: number
    alerts: Alert[]
}
export interface FeaturedUserAlerts {
    unacked_count: number
    unacked: Alert[]
    acked: Alert[]
}
export interface AlertPatch {
    patches: AlertPatchItem[]
}
export interface AlertPatchItem {
    itag: string
    patch: string
}

export interface Announcement {
    author?: PlatformUser
    id: string
    title: string
    content: string
    last_modified: string
    status: string
    target: string | null
}
export interface AnnouncementList {
    announcements: Announcement[]
}

export interface Question {
    id: string
    question: string
    paragraph: string
    placeholder: string
    short: boolean
}
export interface Position {
    id: string
    tags: string[]
    info: string
    name: string
    questions: Question[]
    hidden: boolean
    closed: boolean
}
export interface AppMeta {
    positions: Position[]
    stable: boolean
}
export interface AppResponse {
    app_id: string
    user_id: string
    questions: Question[]
    answers: { [key: string]: string }
    state: string
    created_at: string
    position: string
    review_feedback?: string
}
export interface AppListResponse {
    apps: AppResponse[]
}

export interface AuthorizeRequest {
    client_id: string
    code: string
    redirect_uri: string
    protocol: string
    scope: string
}
export interface UserLogin {
    token: string
    user_id: string
}
export interface OauthMeta {
    client_id: string
    url: string
}
export interface TestAuth {
    auth_type: string
    target_id: string
    token: string
}

export interface BlogPost {
    slug: string
    title: string
    description: string
    author?: PlatformUser
    created_at: string
    content: string
    draft: boolean
    tags: string[]
}
export interface BlogListPost {
    slug: string
    title: string
    description: string
    author?: PlatformUser
    created_at: string
    draft: boolean
    tags: string[]
}
export interface Blog {
    posts: BlogListPost[]
}
export interface PublishBlogPost {
    draft: boolean
}
export interface CreateBlogPost {
    slug: string
    title: string
    description: string
    content: string
    tags: string[]
}
export interface EditBlogPost {
    title: string
    description: string
    content: string
    tags: string[]
}

export type BotFlags = string

export interface IndexBot {
    bot_id: string
    user?: PlatformUser
    short: string
    type: string
    vanity_ref: string
    vanity: string
    votes: number
    shards: number
    library: string
    invite_clicks: number
    clicks: number
    servers: number
    nsfw: boolean
    tags: string[]
    premium: boolean
    banner: string | null
}

export interface QueueBot {
    bot_id: string
    user?: PlatformUser
    short: string
    long: string
    type: string
    nsfw: boolean
    tags: string[]
    premium: boolean
    clicks: number
    claimed_by?: PlatformUser
    banner: string | null
}
export interface BotStats {
    servers: number
    shards: number
    users: number
    shard_list: number[]
}

export interface Bot {
    itag: string
    bot_id: string
    client_id: string
    extra_links: Link[]
    tags: string[]
    flags: BotFlags[]
    prefix: string
    user?: PlatformUser
    owner?: PlatformUser
    short: string
    long?: string
    library: string
    nsfw: boolean
    premium: boolean
    last_stats_post: string | null
    servers: number
    shards: number
    shard_list: number[]
    users: number
    votes: number
    clicks: number
    unique_clicks: number
    invite_clicks: number
    banner: string | null
    invite: string
    type: string
    vanity_ref: string
    vanity: string
    vote_banned: boolean
    start_premium_period: string | null
    premium_period_length: any
    cert_reason: string | null
    uptime: number
    total_uptime: number
    uptime_last_checked: string | null
    claimed_by: string | null
    approval_note: string | null
    created_at: string | null
    last_claimed: string | null
    legacy_webhooks: boolean
    team_owner?: Team
    captcha_opt_out: boolean
}

export interface CreateBot {
    bot_id: string
    client_id: string
    short: string
    long: string
    prefix: string
    invite: string
    banner?: string
    library: string
    extra_links: Link[]
    tags: string[]
    nsfw: boolean
    staff_note?: string
    team_owner: string
}
export interface BotSettingsUpdate {
    short: string
    long: string
    prefix: string
    invite: string
    banner?: string
    library: string
    extra_links: Link[]
    tags: string[]
    nsfw: boolean
    captcha_opt_out: boolean
}
export interface QueueBots {
    bots: QueueBot[]
}
export interface Invite {
    invite: string
}

export interface ListIndexBot {
    certified: IndexBot[]
    premium: IndexBot[]
    most_viewed: IndexBot[]
    packs: IndexBotPack[]
    recently_added: IndexBot[]
    top_voted: IndexBot[]
}
export interface DiscordBotMeta {
    bot_id: string
    client_id: string
    name: string
    avatar: string
    list_type: string
    guild_count: number
    bot_public: boolean
    flags: string[]
    description: string
    tags: string[]
    fallback: boolean
}
export interface PatchBotTeam {
    team_id: string
}

export interface ChangelogEntry {
    version: string
    extra_description: string
    prerelease: boolean
    added: string[]
    updated: string[]
    removed: string[]
}
export interface Changelog {
    entries: ChangelogEntry[]
}

export interface Link {
    name: string
    value: string
}

export interface SEO {
    name: string
    id: string
    avatar: string
    short: string
}

export interface ApiError {
    context?: { [key: string]: string }
    message: string
}

export interface PagedResult<T extends any> {
    count: number
    per_page: number
    results: T
}
export interface Vanity {
    itag: string
    target_id: string
    target_type: string
    code: string
}

export interface NotificationInfo {
    public_key: string
}

export interface UserSubscription {
    auth: string
    p256dh: string
    endpoint: string
}

export interface NotifGet {
    endpoint: string
    notif_id: string
    created_at: string
    browser_info: NotifBrowserInfo
}
export interface NotifBrowserInfo {
    os: string
    browser: string
    browser_ver: string
    mobile: boolean
}
export interface NotifGetList {
    notifications: NotifGet[]
}

export interface BotPack {
    owner?: PlatformUser
    name: string
    short: string
    votes: number
    tags: string[]
    url: string
    created_at: string
    bot_ids: string[]
    bots: IndexBot[]
}
export interface IndexBotPack {
    owner_id: string
    name: string
    short: string
    votes: number
    tags: string[]
    url: string
    created_at: string
    bot_ids: string[]
}

export interface Partner {
    id: string
    name: string
    image: string
    short: string
    links: Link[]
    user?: PlatformUser
}
export interface PartnerList {
    featured: (Partner | undefined)[]
    bot_partners: (Partner | undefined)[]
    bot_list_partners: (Partner | undefined)[]
}

export interface PaymentPlan {
    id: string
    name: string
    benefit: string
    time_period: number
    price: number
}
export interface PlanList {
    plans: PaymentPlan[]
}

export interface PlatformUser {
    id: string
    username: string
    display_name: string
    avatar: string
    bot: boolean
    status: PlatformStatus
    extra_data: { [key: string]: any }
}

export interface ResolvedReminder {
    name: string
    avatar: string
}
export interface Reminder {
    user_id: string
    target_type: string
    target_id: string
    resolved?: ResolvedReminder
    created_at: string
    last_acked: string
}
export interface ReminderList {
    reminders: Reminder[]
}

export interface Review {
    id: string
    target_type: string
    target_id: string
    author?: PlatformUser
    content: string
    stars: number
    created_at: string
    parent_id: string
}
export interface ReviewList {
    reviews: Review[]
}

export interface SearchFilter {
    from: number
    to: number
}

export interface TagFilter {
    tags: string[]
    tag_mode: TagMode
}
export interface SearchQuery {
    query: string
    servers: SearchFilter
    votes: SearchFilter
    shards: SearchFilter
    tags: TagFilter
}
export interface SearchResponse {
    bots: IndexBot[]
}

export interface Server {
    server_id: string
    name: string
    avatar: string
    total_members: number
    online_members: number
    short: string
    long: string
    type: string
    state: string
    tags: string[]
    flags: string[]
    vanity_ref: string
    vanity: string
    extra_links: Link[]
    team_owner?: Team
    invite_clicks: number
    banner: string | null
    clicks: number
    unique_clicks: number
    nsfw: boolean
    votes: number
    vote_banned: boolean
    premium: boolean
    start_premium_period: string | null
    premium_period_length: any
    captcha_opt_out: boolean
}
export interface ServerSettingsUpdate {
    short: string
    long: string
    banner?: string
    extra_links: Link[]
    tags: string[]
    nsfw: boolean
    captcha_opt_out: boolean
}

export interface ServiceDiscovery {
    services: SDService[]
}
export interface SDService {
    id: string
    prod_url: string
    staging_url?: string
    docs?: string
    description: string
    needs_staging?: boolean
}
export interface SDList {
    services: string[]
}

export interface StaffTemplateList {
    templates: StaffTemplateMeta[]
}
export interface StaffTemplateMeta {
    name: string
    icon: string
    description: string
    templates: StaffTemplate[]
}
export interface StaffTemplate {
    name: string
    emoji: string
    tags: string[]
    description: string
}

export interface ListStats {
    total_bots: number
    total_approved_bots: number
    total_certified_bots: number
    total_staff: number
    total_users: number
    total_votes: number
    total_packs: number
    total_tickets: number
}
export interface StatusDocs {
    key1: string
    key2: string
    key3: string
    etc: string
}
export interface StaffTeam {
    members: UserPerm[]
}

export interface PermissionDataOverride {
    name: string
    desc: string
}
export interface PermissionData {
    id: string
    name: string
    desc: string
    supported_entities: string[]
    data_override?: { [key: string]: PermissionDataOverride | undefined }
}
export interface Team {
    id: string
    name: string
    avatar: string
    banner: string | null
    short: string | null
    tags: string[]
    votes: number
    extra_links: Link[]
    entities?: TeamEntities
}
export interface TeamBulkFetch {
    teams: Team[]
}
export interface TeamEntities {
    targets?: string[]
    members?: TeamMember[]
    bots?: IndexBot[]
}
export interface TeamMember {
    itag: string
    user?: PlatformUser
    flags: string[]
    created_at: string
    mentionable: boolean
}
export interface CreateEditTeam {
    name: string
    avatar: string
    banner?: string
    short?: string
    tags?: string[]
    extra_links?: Link[]
}
export interface CreateTeamResponse {
    team_id: string
}
export interface PermissionResponse {
    perms: PermissionData[]
}
export interface AddTeamMember {
    user_id: string
    perms: string[]
}
export interface EditTeamMember {
    perm_update?: PermissionUpdate
    mentionable?: boolean
}
export interface PermissionUpdate {
    add: string[]
    remove: string[]
}
export interface UserEntityPerms {
    perms: string[]
}

export interface Ticket {
    id: string
    channel_id: string
    topic_id: string
    issue: string
    ticket_context: { [key: string]: string }
    messages: Message[]
    author?: PlatformUser
    close_user?: PlatformUser
    open: boolean
    created_at: string
}
export interface Message {
    id: string
    timestamp: string
    content: string
    embeds: (any | undefined)[]
    author_id: string
    author?: PlatformUser
    attachments: (any | undefined)[]
}

export interface User {
    itag: string
    user?: PlatformUser
    experiments: string[]
    staff_onboarded: boolean
    staff_onboard_state: string
    staff_onboard_last_start_time: string | null
    staff_onboard_guild: string | null
    staff_rpc_last_verify: string | null
    staff: boolean
    admin: boolean
    hadmin: boolean
    certified: boolean
    ibldev: boolean
    iblhdev: boolean
    owner: boolean
    bot_developer: boolean
    bug_hunters: boolean
    captcha_sponsor_enabled: boolean
    extra_links: Link[]
    about: string | null
    vote_banned: boolean
    banned: boolean
    user_teams: Team[]
    user_bots: IndexBot[]
    user_packs: IndexBotPack[]
}
export interface UserPerm {
    user?: PlatformUser
    experiments: string[]
    banned: boolean
    captcha_sponsor_enabled: boolean
    vote_banned: boolean
    staff: boolean
    admin: boolean
    hadmin: boolean
    ibldev: boolean
    iblhdev: boolean
    owner: boolean
}
export interface ProfileUpdate {
    about: string
    extra_links: Link[]
    captcha_sponsor_enabled?: boolean
}
export interface BoosterStatus {
    remark?: string
    is_booster: boolean
}

export interface EntityVote {
    itag: string
    target_type: string
    target_id: string
    author: string
    upvote: boolean
    void: boolean
    void_reason: string | null
    voided_at: any
    created_at: string
    vote_num: number
}
/**
 * Vote Info
 */
export interface VoteInfo {
    per_user: number
    vote_time: number
}

export interface VoteWait {
    hours: number
    minutes: number
    seconds: number
}

export interface UserVote {
    has_voted: boolean
    valid_votes: string[]
    vote_info?: VoteInfo
    wait?: VoteWait
}
export interface HCaptchaInfo {
    site_key: string
}

export interface WebhookLogEntry {
    id: string
    target_id: string
    target_type: string
    user?: PlatformUser
    url: string
    data: { [key: string]: any }
    response: string | null
    created_at: string
    state: string
    tries: number
    last_try: string
    bad_intent: boolean
    status_code: number
}
export interface PatchWebhook {
    webhook_url: string
    webhook_secret: string
    clear: boolean
}
export interface GetTestWebhookMeta {
    data: TestWebhookType[]
}
export interface TestWebhookType {
    type: string
    Data: TestWebhookVariables[]
}
export interface TestWebhookVariables {
    id: string
    name: string
    value: string
    type: WebhookType
}

export interface ParsedEvent {
    authorized: boolean
    error: string
    statusCode: number
    output?: any
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
