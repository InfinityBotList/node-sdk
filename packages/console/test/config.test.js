const console = require('..');

console.config({
  displayFilename: true,
  displayTimestamp: true,
  displayDate: false
});

console.success('Hello from the Global scope');

function scopedConfigTest() {
  const fooLogger = console.scope('foo scope');

  fooLogger.config({
    displayFilename: true,
    displayTimestamp: false,
    displayDate: true
  });

  fooLogger.success('Hello from the Local scope');
}

scopedConfigTest();