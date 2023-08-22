const { EventEmitter } = require('../../dist/index');
const chalk = require('chalk');
const ora = require('ora');

module.exports.testEventEmitter = async function() {

    const wait = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

    const logs = ora('  creating new emitter client!');
    const logs2 = ora('  attempting to send emitter message!');
    const logs3 = ora('  all tests complete, cleaning up tasks!');

    logs.start();

    await wait(5000)

    const ee = new EventEmitter();

    if (ee) setTimeout(() => {
        logs.stopAndPersist({ 
            text: chalk.green(' emitter client created successfully!'), 
            symbol: '✔️'
        });
    }, 5000);

    else if(!ee) setTimeout(() => {
        logs.stopAndPersist({
            text: chalk.red(' failed to create emitter client, please check your code'),
            symbol: '❌'
        })
    }, 5000);

    ee.on('message', function(text) {
        setTimeout(() => {
            logs2.stopAndPersist({
                text: chalk.green(` emitter message successful, content: ${text}`),
                symbol: '✔️'
            })
        }, 5000)
    });
    
    ee.on('error', function(err) {
        setTimeout(() => {
            logs2.stopAndPersist({
                text: chalk.red(` emitter message failed to send with reason: ${err.message}`),
                symbol: '❌'
            })
        }, 5000)
    })

    logs2.start();

    await wait(5000);

    ee.emit('message', 'test emitter message');

    await wait(5000);

    logs3.start()

    setTimeout(() => {
        logs3.stopAndPersist({
            text: chalk.green(' done, exiting.'),
            symbol: '✔️'
        })
    }, 5000)
}