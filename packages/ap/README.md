# @infinitylist/autoposter
The easy way to post your bots user, server and shard count stats.

> Note: This package will post stats every 5 Minutes by default. 

---


## Supported Libraries
```diff
+ discord.js
- detritus
- discord-rose
- eris
```

---

## Example
```js
const { InfinityAutoPoster } = require('@infinitylist/ap')

const poster = InfinityAutoPoster('auth_token', client) // your discord.js client

// Optional logger
poster.on('posted', (stats) => {

  console.log(`Posted stats to the Infinity API | ${stats.servers} servers`)

});
```

---

## Example Error
```js
const { InfinityAutoPoster } = require('@infinitylist/ap')

const poster = InfinityAutoPoster('auth_token', client) // your discord.js client

// Optional error logger
poster.on('error', (err) => {

  console.log(err)
})
```

---

## Example Options

| name             |      description                  |     type   |   default     |
|------------------|:---------------------------------:|:----------:|--------------:|
| interval         |  Interval to post stats at        | Number     | 300000        |
| postOnStart      |  Post when the interval starts    | Boolean    | true          |
| startPosting     |  Interval to post stats at        | Number     | false         |

> Note: if you set `startPosting` to false you will have to call `._start()`

```js
/**
 * INITIALIZE THE AUTO POSTER USING YOUR
 * DISCORD.JS CLIENT WITH OPTIONS
 */
const poster = InfinityAutoPoster(auth, client, { 
    interval: 500000,
    startPosting: true,
    postOnStart: false
});

poster.on('posted', (stats) => {

  console.log(`Posted stats to the Infinity Bot List API | ${stats.servers} servers`)

});

// Optional error logger
poster.on('error', (err) => {

  console.log(err)
})
```

### Example Start Event
```js
/**
 * INITIALIZE THE AUTO POSTER USING YOUR
 * DISCORD.JS CLIENT WITH OPTIONS
 */
const poster = InfinityAutoPoster(auth, client, { 
    interval: 500000,
    startPosting: false,
    postOnStart: true
});

await poster._start();

poster.on('posted', (stats) => {

  console.log(`Posted stats to the Infinity Bot List API | ${stats.servers} servers`)

});

// Optional error logger
poster.on('error', (err) => {

  console.log(err)
})
```



