'use strict';

const { EventEmitter } = require('..');
const assert = require('assert').strict;

const ee = new EventEmitter();

console.info('[EventEmitter]: creating new event emitter');

ee.on('message', function(text) {
    console.log(text);
});


ee.on('error', function(err) {
    console.error(`Emitter test failed: ${err.stack}`);
})

ee.emit('message', 'Emitter tests complete');
