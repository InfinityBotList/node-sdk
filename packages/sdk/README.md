# @infinitylist/sdk
Simple module for interacting with the Infinity Bot List API!

## Quick Links
- [Installation](https://infinity-development.github.io/node-sdk/index.html#md:install)
- [InfinityFetcher](https://infinity-development.github.io/node-sdk/index.html#md:infinity-fetcher)
- [InfinityPoster](https://infinity-development.github.io/node-sdk/index.html#md:infinity-poster)
- [Classes](https://infinity-development.github.io/node-sdk/modules.html)

---

## Install
```js
npm i @infinitybots/node-sdk
```

or

```js
npm i @infinitybots/node-sdk@latest
```

---

## Infinity Fetcher
Fetch bot information such as checking if a user has voted!

### User Vote Status
Check if a user has voted for your bot recently

- [Full schema](https://infinity-development.github.io/node-sdk/classes/InfinityFetcher.html#getUserVotes)

#### Usage Example

```js
const { InfinityFetcher } = require("@infinitybots/node-sdk")

const ibl = new InfinityFetcher({
    auth: "YOUR_BOTS_API_KEY",
    botID: "YOUR_BOTS_ID"
});

const results = await ibl.getUserVotes(USER_ID_HERE);

console.log(`Has user voted: ${results.has_voted}`);
console.log(`User can vote again in: ${results.vote_info.vote_time} hours`);
console.log(`User can vote again in: ${results.wait.hours}h ${results.wait.minutes}m ${results.wait.seconds}s`)
```

### Get Bot Info
Fetch some Information about your bot from our API

- [Full schema](https://infinity-development.github.io/node-sdk/classes/InfinityFetcher.html#getBotInfo)

#### Usage Example

```js
const { InfinityFetcher } = require("@infinitybots/node-sdk")

const ibl = new InfinityFetcher({
    auth: "YOUR_BOTS_API_KEY",
    botID: "YOUR_BOTS_ID"
});

const results = await ibl.getBotInfo();

console.log(`${results.bot_id}`);
```

--- 

## Infinity Poster
Post your bots user, server or shard count using our api!

### Post Server Count
Post only your bots server count

```js
const { InfinityPoster } = require("@infinitybots/node-sdk")

const ibl = new InfinityPoster({
    auth: "YOUR_BOTS_API_KEY",
    botID: "YOUR_BOTS_ID"
});

await ibl.postServerCount({ servers: client.guilds.cache.size })
.then(() => console.log('Stats have been posted successfully'))
.catch((e) => console.log(`Failed posting stats: ${e.stack}`))
```

### Post Shard Count
Post only your bots shard count

```js
const { InfinityPoster } = require("@infinitybots/node-sdk")

const ibl = new InfinityPoster({
    auth: "YOUR_BOTS_API_KEY",
    botID: "YOUR_BOTS_ID"
});

await ibl.postShardCount({ shards: client.shards.size })
.then(() => console.log('Stats have been posted successfully'))
.catch((e) => console.log(`Failed posting stats: ${e.stack}`))
```

### Post User Count
Post only your bots user count

```js
const { InfinityPoster } = require("@infinitybots/node-sdk")

const ibl = new InfinityPoster({
    auth: "YOUR_BOTS_API_KEY",
    botID: "YOUR_BOTS_ID"
});

await ibl.postUserCount({ users: client.users.cache.size })
.then(() => console.log('Stats have been posted successfully'))
.catch((e) => console.log(`Failed posting stats: ${e.stack}`))
```

### Post Bot Stats
Post your bots server, shard and user count

```js
const { InfinityPoster } = require("@infinitybots/node-sdk")

const ibl = new InfinityPoster({
    auth: "YOUR_BOTS_API_KEY",
    botID: "YOUR_BOTS_ID"
});

await ibl.postBotStats({
    servers: client.guilds.cache.size,
    shards: client.shards.size,
    users: client.users.cache.size
 }).then(() => console.log('Stats have been posted successfully'))
.catch((e) => console.log(`Failed posting stats: ${e.stack}`))
```

---