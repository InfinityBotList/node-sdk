'use strict';

const { InfinityFetcher } = require('../../dist');
const { prettyLogs } = require("@infinitylist/logger");

module.exports.testBotInfo = async function({ botID }) {
    
    await prettyLogs('[@infinitylist/sdk:getBotInfo()]: initializing test', 'info');

    const fetcher = new InfinityFetcher({ botID: botID });

    const fetch = await fetcher.getBotInfo();

    await prettyLogs(`[@infinitylist/sdk:getBotInfo()]: attempting to fetch bot information`, 'debug')

    return fetch;
};