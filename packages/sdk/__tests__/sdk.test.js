'use strict';

const { prettyLogs } = require("@infinitylist/logger");
const { testBotInfo } = require('./tests/testBotInfo');
const { testUserVotes } = require('./tests/testUserVotes');
const { testPostStats } = require('./tests/testPostStats');

const botID = '913266703398473810';
const userID = '510065483693817867';

async function run_tests() {

    await prettyLogs('[@infinitylist]: starting tests, please wait!');

    setTimeout(async () => {
        
        await testBotInfo({ botID: botID })
        .then(async (i) => {
        
            if (!i.bot_id) return prettyLogs('[@infinitylist/sdk:getBotInfo()]: test failed, unable to locate bot id from response', 'error');
            else if (i.bot_id === undefined) return prettyLogs('[@infinitylist/sdk:getBotInfo()]: test failed, response was undefined', 'error');
            else if (i.bot_id === null) return prettyLogs('[@infinitylist/sdk:getBotInfo()]: test failed, response was null', 'error');
    
            else {

                await prettyLogs(`[@infinitylist/sdk:getBotInfo()]: fetched bot information: 'bot_id: ${i.bot_id} | state: ${i.state}'`);
                return prettyLogs('[@infinitylist/sdk:getBotInfo()]: test successful.. exiting');
            }
        })
        .catch(async (e) => {

            await prettyLogs('[@infinitylist/sdk:getBotInfo()]: test failed, see error(s) below');
            await prettyLogs(e.stack, 'error');

            return process.exit(-1);
        });

        setTimeout(async () => {
            
            await testUserVotes({ botID: botID, userID: userID })
            .then(async (i) => {

                if (typeof i.has_voted !== 'boolean') return prettyLogs('[@infinitylist/sdk:getUserVotes()]: test failed, response was not a valid boolean', 'error');
                if (i.has_voted === undefined) return prettyLogs('[@infinitylist/sdk:getUserVotes()]: test failed, response was undefined', 'error');
                if (i.has_voted === null) return prettyLogs('[@infinitylist/sdk:getUserVotes()]: test failed, response was null', 'error');

                else {

                    await prettyLogs(`[@infinitylist/sdk:getUserVotes()]: fetched vote information for: ${userID} | has_voted: ${i.has_voted}`);
                    return prettyLogs('[@infinitylist/sdk:getUserVotes()]: test successful.. exiting');
                }
            })
            .catch(async(e) => {

                await prettyLogs('[@infinitylist/sdk:getUserVotes()]: test failed, see error(s) below');
                await prettyLogs(e.stack, 'error');

                return process.exit(-1);
            })

            setTimeout(async () => {

                await testPostStats()
                .then(async (i) => {

                    await prettyLogs(`[@infinitylist/sdk:postBotStats()]: fetched schema: ${i}`);
                    return prettyLogs('[@infinitylist/sdk:postBotStats()]: test successful.. exiting');
                })
                .catch((e) => {})


            }, 2000)
        }, 2000)
    }, 2000)
}

run_tests();