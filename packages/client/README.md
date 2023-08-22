# @infinitylist/client
Official NPM Client for our Autoposter Module!

---

## Webhooks v2

### Available Data
```
{
  "created_at": 0,
  "creator": {
    "avatar": "string",
    "bot": false,
    "discriminator": "string",
    "id": "string",
    "in_guild": "string",
    "nickname": "string",
    "status": "string",
    "username": "string"
  },
  "data": {
    "test": false,
    "votes": 0
  },
  "targets": {
    "bot": {
      "avatar": "string",
      "bot": false,
      "discriminator": "string",
      "id": "string",
      "in_guild": "string",
      "nickname": "string",
      "status": "string",
      "username": "string"
    }
  },
  "type": "BOT_VOTE"
}
```

### Example Fastify Server

- For a basic server we created for you to use go [here](https://github.com/InfinityBotList/Webhook-Server)

```js
const { MessageEmbed } = require("discord.js");
const { Reedhook } = require("@infinitybots/client");
const moment = require("moment");

const webhook = new Reedhook("YOUR_WEBHOOK_SECRET");

module.exports = async (fastify, opts) => {
  fastify.post(
    "/votes",
    webhook.hookListener(async (voteData, req, res) => {

      let embed = new MessageEmbed()
        .setTitle(`Vote Logs`)
        .setColor("RANDOM")
        .setDescription(`Woah someone has voted for me on Infinity Bot List`)
        .addFields(
          {
            name: "Total Votes",
            value: `${voteData.data.votes}`,
            inline: true,
          },
          {
            name: "User",
            value: `${voteData.creator.username}#${voteData.creator.discriminator}`,
            inline: true,
          },
          {
            name: "Time",
            value: `${moment(voteData.created_at)}`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Infinity Vote Logger",
          iconURL: `${voteData.creator.avatar}`,
        });
    })
  );
};
```