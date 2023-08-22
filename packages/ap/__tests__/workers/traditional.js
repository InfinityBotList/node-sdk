const { Client } = require('discord.js');

const client = new Client();

const { InfinityBots } = require('@infinitylist/client');
const ibl = new InfinityBots(process.argv[2]);

ibl._request = (method, path, body) => {
    console.log(method, path, body)
}

const { InfinityAutoPoster } = require('../../');

InfinityAutoPoster(process.argv[2], client, {
    startPosting: true,
    api: ibl
});

client.login();