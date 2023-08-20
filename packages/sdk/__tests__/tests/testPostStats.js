'use strict';

const { InfinityPoster } = require('../../dist');
const { prettyLogs } = require("@infinitylist/logger");

module.exports.testPostStats = async function() {
    
    await prettyLogs('[@infinitylist/sdk:postBotStats()]: initializing test', 'info');

    return new InfinityPoster;
};