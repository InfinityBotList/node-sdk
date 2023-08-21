import fs from 'fs'
import ssri from 'ssri'
import { log } from './consoleLogs'

/**
 * WHEN IPM IS RUN AND A TARBALL IS ALREADY IN THE NODE_MODULES
 * DIRECTORY, WE WILL STILL NEED TO READ THE FILE TO FIND ITS
 * SSRI (STANDARD SUBRESOURCE INTEGRITY) SO THAT IT CAN BE SET
 * ON THE PACKAGES .INTEGRITY PROPERTY IN THE LOCKFILE.
 *
 * @param filePath /Users/you/my-project/node_modules/@infinitylist/installer-0.0.1.tar
 */
export function getSsriFromFile(filePath: string): Promise<string> {
    return new Promise(resolve => {
        const $integrity = ssri.integrityStream()
        const $read = fs.createReadStream(filePath)

        $integrity.on('data', () => {
            /**
             * THIS CAN STAY EMPTY IT IS JUST
             * USED TO SUBSCRIBE TO STREAM RUNS
             */
        })

        $integrity.on('integrity', result => {
            log.verbose(`finished getting integrity of hash of: ${filePath}`)
            const integrity = ssri.parse(result.sha512[0]).toString()
            resolve(integrity)
        })

        $read.on('error', err => {
            log.error(`error reading: ${filePath}\n delete this file and ipm again`, err)
            process.exit(1)
        })

        $read.pipe($integrity)
    })
}
