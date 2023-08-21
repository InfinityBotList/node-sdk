/**
 * GET A DURATION OF TIME FORMATTED IN MINUTES AND SECONDS
 * @example `09:591
 */
export function getTimeBetween(dateFrom: Date, dateTo: Date): string {
    return msToTime(dateTo.getTime() - dateFrom.getTime())

    function msToTime(ms: number): string {
        const mins = msToMins(ms)
        const secs = msToSecs(ms)
        return pad(mins) + ':' + pad(secs)
    }

    function msToMins(ms: number): number {
        return Math.floor(ms ? ms / 1000 / 60 : 0)
    }

    function msToSecs(ms: number): number {
        return Math.floor(ms ? (ms / 1000) % 60 : 0)
    }

    function pad(value: number): string {
        const whole = Math.floor(value)
        return whole < 10 ? `0${whole}` : `${whole}`
    }
}
