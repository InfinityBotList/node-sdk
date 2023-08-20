'use strict';

const { prettyLogs } = require('..');
const assert = require('assert').strict;

prettyLogs('[@infinitybots/logger]: testing warn logs', 'warn');
prettyLogs('[@infinitybots/logger]: testing error logs', 'error');
prettyLogs('[@infinitybots/logger]: testing debug logs', 'debug');
prettyLogs('[@infinitybots/logger]: testing info logs', 'info');

return prettyLogs('[@infinitybots/logger]: all tests were completed');