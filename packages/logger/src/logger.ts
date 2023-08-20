import chalk from 'chalk'
import moment from 'moment'

module.exports = class InfinityLogger {
    static prettyLogs(content = '', type = 'log') {
        const date = `${moment().format('DD-MM-YYYY hh:mm:ss')}`

        switch (type) {
            case 'log': {
                return console.log(`${chalk.green(`[${date}] [LOG]:`)} ${content}`)
            }

            case 'warn': {
                return console.log(`${chalk.yellow(`[${date}] [WARN]:`)} ${content}`)
            }

            case 'error': {
                return console.log(`${chalk.red(`[${date}] [ERROR]:`)} ${content}`)
            }

            case 'debug': {
                return console.log(`${chalk.white(`[${date}] [DEBUG]:`)} ${content}`)
            }

            case 'info': {
                return console.log(`${chalk.blue(`[${date}] [COMMAND]:`)} ${content}`)
            }

            default:
                throw new TypeError('[@infinitybots/logger]: type should be one of "log, warn, error, debug or info"')
        }
    }
}
