# @infinitylist/logger
Simple module for cleaner looking console logs

---

## Usage

### Parameters

| Type     |      Description                        |
|----------|:---------------------------------------:|
| content  |  The content/message for the log        |
| type     |  The type of log you want to send       |


### Types

| Type     |      Description                                               |
|----------|:--------------------------------------------------------------:|
| log      | Default log type displayed with a green id and timestamp       |
| warn     | Warning displayed with a yellow id and timestamp               |
| error    | Error logs displayed with a red id and timestamp               |
| debug    | Debug logs displayed with a white id and timestamp             |
| info     | Info logs displayed with a blue id and timestamp               |

---

## Examples

### Node

```js
const { prettyLogs} = require("@infinitybots/logger");

return prettyLogs('[@infinitybots/logger]: testing warn logs', 'warn');
```

### ES6
```js
import { prettyLogs} from "@infinitybots/logger";

return prettyLogs('[@infinitybots/logger]: testing warn logs', 'warn');
```
