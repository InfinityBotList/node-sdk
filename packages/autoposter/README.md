# @infinitylist/autoposter

The easy way to post your bots user, server and shard count.

> Note: This Module will post stats every 5 Minutes

---


## Supported Librarys
- Detritus
- Discord-Rose
- Discord.js
- Eris

---

## Example
```js
const { InfinityAutoPoster } = require('ibl-autopost')

const poster = InfinityAutoPoster('auth_token', client) // your discord.js or eris client

// Optional Logger
poster.on('posted', (stats) => {

  console.log(`Posted stats to the Infinity Bot List API | ${stats.servers} servers`)

});
```

---

## Example Error
```js
const { InfinityAutoPoster } = require('ibl-autopost')

const poster = InfinityAutoPoster('auth_token', client) // your discord.js or eris client

// Optional Logger
poster.on('error', (err) => {

  console.log(err)
})
```