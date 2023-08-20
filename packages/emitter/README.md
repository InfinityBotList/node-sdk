# @infinitylist/emitter
Event emitter that creates types based off of an interface

---

## Usage Example

> More examples and documentation coming soon

### Node

```js
const { EventEmitter } = require("@infinitybots/emitter");

const ee = new EventEmitter();

ee.on('message', function(text) {
    console.log(text);
});

ee.on('error', function(err) {
    console.error(`Emitter test failed: ${err.stack}`);
})

ee.emit('message', 'Emitter tests complete');
```

### ES6
```js
import { EventEmitter } from "@infinitybots/emitter";

const ee = new EventEmitter();

ee.on('message', function(text) {
    console.log(text);
});

ee.on('error', function(err) {
    console.error(`Emitter test failed: ${err.stack}`);
})

ee.emit('message', 'Emitter tests complete');
```