'use strict';

const { InfinityFetcher } = require('../../dist');
const { prettyLogs } = require("@infinitylist/logger");

module.exports.testUserVotes = async function({ botID, userID }) {
    
    await prettyLogs('[@infinitylist/sdk:getUserVotes()]: initializing test', 'info');

    const fetcher = new InfinityFetcher({ botID: botID });

    const fetch = await fetcher.getUserVotes(userID);

    await prettyLogs(`[@infinitylist/sdk:getUserVotes()]: attempting to fetch user's vote information`, 'debug')

    return fetch;
};