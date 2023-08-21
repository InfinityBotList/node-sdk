import fs from 'fs'
import { join } from 'path'
import type { Lockfile } from '../@types/lockfile'
import { log } from './consoleLogs'

/**
 * LOOK FOR A PACKAGE-LOCK.JSON OR OTHERWISE AN NPM-SHRINKWRAP.JSON
 * WITHIN THE PROVIDED ABSOLUTE PATH TO A PROJECT!
 */
export function getLockfile(projectPath: string): { lockfilePath: string; lockfile: Lockfile } | never {
    let lockfilePath = join(projectPath, 'package-lock.json')
    let lockfile = readLockFile(lockfilePath)

    if (!lockfile) {
        lockfilePath = join(projectPath, 'npm-shrinkwrap.json')
        lockfile = readLockFile(lockfilePath)
    }

    if (!lockfile) {
        log.error('no valid package-lock.json or npm-shrinkwrap.json found')
        process.exit(1)
    }

    return { lockfile, lockfilePath }

    function readLockFile(filePath: string): Lockfile | null | never {
        const sw = readJson(filePath)

        if (!sw) return null

        if (Number(sw.lockFileVersion) < 2) {
            log.error(
                `expected lockfileVersion to be 2 or greater in ${filePath}\n npm v7 or greater will create this lockfile version`
            )
            process.exit(1)
        }

        return sw
    }

    function readJson(filePath: string): Lockfile | null | never {
        try {
            const json = fs.readFileSync(filePath, { encoding: 'utf8' })

            if (json.includes('git+')) {
                log.error(
                    `lockfile contains packages installed directly from git, which is no longer supported: ${filePath}`
                )
                process.exit(1)
            }

            return JSON.parse(json)
        } catch (err) {
            log.verbose(`no valid lockfile at: ${filePath}`)
            return null
        }
    }
}
