# @infinitylist/uptime
Simple module that allows you to easily monitor websites, and create a status page.

--- 

## Getting started

### Installation

#### With npm:
```sh-session
npm install @infinitylist/uptime
```

#### With yarn:
```sh-session
yarn install @infinitylist/uptime
```

---

## Usage

### Import the module: 

#### CommonJS Syntax:
```js
const { UptimeClient } = require('@infinitylist/uptime');
```

#### Module ES Syntax:
```js
import { UptimeClient } from '@infinitylist/uptime';
```


### Create a new client
This requires whatever url you want to monitor

```js
const Monitor = new UptimeClient('https://google.com', options)
```

### Options

Object

| PARAMETER | TYPE                                   | OPTIONAL | DEFAULT   | DESCRIPTION                                    |
| --------- | -------------------------------------- | -------- | --------- | ---------------------------------------------- |
| interval  | number                                 | ✓        | 3000ms    | Interval for check site                        |
| retries   | number                                 | ✓        | 3         | Retries before create an outage                |
| timeout   | number                                 | ✓        | 3000ms    | Maximum waiting time before creating an outage |
| headers   | { [key: string]: string } \| undefined | ✓        | undefined | Additional headers to be attached to requests  |

## Events

---

### up

Emitted when site is online

Parameter : status

| PROPERTIES | TYPE   | DESCRIPTION               |
| ---------- | ------ | ------------------------- |
| statusCode | number | The response status code  |
| statusText | string | The response status text  |
| url        | string | The url of website        |
| ping       | number | The ping latency (in ms)  |
| Uptime     | number | Availability time (in ms) |

### outage

Emitted when site is have an outage

Parameter : status

| PROPERTIES     | TYPE   | DESCRIPTION                 |
| -------------- | ------ | --------------------------- |
| statusCode     | number | The response status code    |
| statusText     | string | The response status text    |
| url            | string | The url of website          |
| ping           | number | The ping latency (in ms)    |
| unavailability | number | Unavailability time (in ms) |

### error

Emitted when an error occurred

Parameter : error

## Properties

---

### available

Return true if site is available else return false

Return :

Boolean

### ping

Return the last ping (in ms) or null if it doesn't exist

Return :

Number or Null

### uptime

Return the uptime (in ms) or null if it doesn't exist

Return :

Number or Null

### unavailability

Return the unavailability or null if it doesn't exist

Return :

Number or Null

## Methods

---

## start()

Start the monitoring of website

Return :

Boolean

```js
Monitor._start();
```

## restart()

Restart the monitoring of website

Return :

Boolean

```js
Monitor._restart();
```

## stop()

Stop the monitoring of website

Return :

Boolean

```js
Monitor._stop();
```

## setInterval(newInterval)

Change the interval check

Params :

newInterval : The new interval in ms (number)

Return :

Boolean

```js
Monitor._setInterval(200);
```

## setURL(newURL)

Change the ping endpoint

Params :

newURL : The new url (string).

Return :

Boolean

```js
Monitor._setURL("https://www.exempla-website.com");
```

## Example Monitor Function

```js
const { UptimeClient } = require("@infinitylist/uptime");

module.exports.startMonitor = async ({ client }) => {

  const uptime = new UptimeClient("https://www.exempla-website.com", {
    interval: 20000,
    retries: 3,
  });

  uptime._start();

  uptime.on("up", async (up) => {
    console.log(up);
  });

  uptime.on("outage", async (outage) => {
    console.log(`${outage.statusCode} | ${outage.statusText}`)
  });

  uptime.on("error", async (error) => {
    await console.error(error);
    await uptime._setInterval(0);
    return uptime._stop();
  });
};
```

---








