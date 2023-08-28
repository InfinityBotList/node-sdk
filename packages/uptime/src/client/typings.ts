export interface IObject {
    [index: string]: any
}

export interface IOptions {
    interval?: number | string
    retries?: number
    timeout?: number
    headers?: { [key: string]: string } | undefined
}

export interface IOutage {
    type: string
    statusCode: number | undefined
    statusText: string | undefined
    ping: number | null
    url: string
    unavailability: number
}

export interface IUp {
    type: string
    statusCode: number | undefined
    statusText: string | undefined
    ping: number | null
    url: string
    uptime: number | null
}

interface Iconfig {
    minInterval: number
    default: {
        interval: number
        retries: number
        timeout: number
        headers: { [key: string]: string } | undefined
        available: null
        uptime: null
        ping: null
        unavailability: null
        failures: number
    }
}

export const config: Iconfig = {
    minInterval: 3000,
    default: {
        interval: 3000,
        retries: 3,
        timeout: 3000,
        headers: undefined,
        available: null,
        uptime: null,
        ping: null,
        unavailability: null,
        failures: 0
    }
}
