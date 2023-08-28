'use strict';

const { UptimeClient } = require('../..');
const chalk = require('chalk');
const ora = require('ora');

module.exports.testUptimeClient = async function() {

    const wait = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

    const logs = ora('  creating new uptime client!');
    const logs2 = ora('  attempting a test ping on google.com!');
    const logs3 = ora('  all tests complete, cleaning up tasks!');

    logs.start();

    await wait(5000)

    const Monitor = new UptimeClient("https://google.com", {
        interval: 3000,
        timeout: 5000,
        headers: { 'Cache-Control': 'no-cache' }
    });

    if (Monitor) setTimeout(() => {
        logs.stopAndPersist({ 
            text: chalk.green(' uptime client created successfully!'), 
            symbol: '✔️'
        });
    }, 5000);

    else if(!Monitor) setTimeout(() => {
        logs.stopAndPersist({
            text: chalk.red(' failed to create uptime client, please check your code'),
            symbol: '❌'
        })
    }, 5000);

    logs2.start();

    await wait(5000);

    Monitor._start();
    
    Monitor.on('outage', (outage) => {
        setTimeout(() => {
            logs2.stopAndPersist({
                text: chalk.green(` pinged google successfully, results: ${outage}`),
                symbol: '✔️'
            })
        }, 5000)
    });
    
    Monitor.on('up', (up) => {
        setTimeout(() => {
            logs2.stopAndPersist({
                text: chalk.green(` pinged google successfully, ping: ${up.ping}`),
                symbol: '✔️'
            })
        }, 5000)
    });

    Monitor.on('error', (error) => {
        setTimeout(() => {
            logs2.stopAndPersist({
                text: chalk.green(` pinged google successfully, error returned: ${error}`),
                symbol: '❌'
            })
        }, 5000)
    })

    await wait(5000);

    logs3.start()

    Monitor._stop()

    setTimeout(() => {
        logs3.stopAndPersist({
            text: chalk.green(' done, exiting.'),
            symbol: '✔️'
        })
    }, 5000)
}