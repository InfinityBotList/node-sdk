const { EventEmitter } = require('../../dist/index');
const { prettyLogs } = require('@infinitylist/logger')

module.exports.testEventEmitter = async function() {

    const ee = new EventEmitter();

    ee.on('message', function(text) {
        prettyLogs(`[@infinitylist/emitter]: ${text}`);
    });
    
    ee.on('error', function(err) {
    prettyLogs(`test failed: ${err.stack}`, 'error');
    })
    
    prettyLogs('[@infinitylist/emitter]: testing event emitter');

    ee.emit('message', 'emitter tests complete');

    prettyLogs('[@infinitylist/emitter]: cleaning up...')
}