const auth = process.argv[2];
const token = process.argv[3];

const path = require('path');
const { InfinityAutoPoster } = require('../dist/index.js');
const {log} = require('@infinitylist/ipm/dist/lib/consoleLogs')

function debug(msg, type) {
    if (type === 'info') {
        log.info(`[TEST]: ${current}: ${msg}`);
    } else if (type === 'success') {
        log.success(`[TEST]: ${current}: ${msg}`)
    } else if (type === 'error') {
        log.error(`[TEST]: ${current}: ${msg}`)
    } else if (type === 'download') {
        log.download(`[TEST]: ${current}: ${msg}`)
    } else if (type === 'deletion') {
        log.deletion(`[TEST]: ${current}: ${msg}`)
    } else if (type === 'verbose') {
        log.verbose(`[TEST]: ${current}: ${msg}`)
    }
} 

const { InfinityBots } = require('@infinitylist/client');
const ibl = new InfinityBots(auth);

ibl._request = (method, path, body) => {
    debug(`${method} ${path}\n${JSON.stringify(body, null, 2)}`, 'download')
}

const Discord = require('discord.js');
const shards = Math.floor(Math.random() * 3) + 2;
let master;
let current = 'discord.js';
let kill;

debug(`spawning new client`, 'info');

const libraries = {
    'discord.js': () => {
        const client = new Discord.Client({ shards });

        client.on('ready', async () => {
            await wait(5000);
            debug('received ready event from client', 'success');
        })

        client.on('shardError', (e) => {
            return debug(`sharding failed: ${e}`, 'error')
        })

        client.on('error', (error) => {
            debug(`client error: ${error.message}`)
        })

        manager = InfinityAutoPoster(auth, client, { startPosting: true, api: ibl });

        if (!manager) return debug('unable to establish auto poster connection', 'error');

        client.login(token);

        kill = () => {
            manager.stop();
            client.destroy();
        }
    },
    'discord.js.traditional': async () => {
        const sharder = new Discord.ShardingManager('./packages/ap/__tests__/workers/traditional.js', { token: token, totalShards: shards, respawn: false });

        debug(`spawning shards, please wait...`, 'info');
        
        await wait(5000);

        sharder.spawn().then(() => {
            debug('received ready from all shards!', 'success');
            manager.emit('posted');
        })

        kill = () => {
            sharder.shard.forEach(x => x.kill());
            debug(`successfully killed: ${shards} shards`, 'success');
        }
    },
    'discord.js.sharder': async() => {
        const sharder = new Discord.ShardingManager('./packages/ap/__tests__/workers/sharder.js', { token: token, totalShards: shards, respawn: false});

        manager = InfinityAutoPoster(auth, sharder, { startPosting: true, api: ibl });

        debug(`spawning shards, please wait...`, 'info');

        sharder.spawn().then(() => {
            debug('received ready from all shards!', 'success');
            manager.emit('posted');
        })

        kill = () => {
            sharder.shards.forEach(x => x.kill());
            debug(`successfully killed: ${shards} shards`, 'success');
        }
    }
}

const wait = (time) => new Promise(resolve => setTimeout(() => resolve(), time))

async function run_tests() {
    if (process.argv[4]) {
        current = process.argv[4];
        libraries[current]();
    
        manager.on('posted', () => {
            debug('stats posted successfully', 'success');
        })

        manager.on('error', (error) => debug(`auto poster error: ${error.message}`))
    }

    for (const cur in libraries) {
        current = cur;
        debug('loading new client session', 'download');

        libraries[cur]();


        const p = new Promise((r) => manager.on('posted', () => r()));
        p.then(() => debug('stats posted successfully', 'success'));
        p.catch((e) => debug(`stats post failed: ${e.message}`, 'error'));

        debug('done, cleaning up tasks', 'download');

        await wait(5000);

        kill();

        await wait(5000);

        debug('client destroyed, exiting...');

        process.exit();
    }

    process.exit();
}

run_tests();


