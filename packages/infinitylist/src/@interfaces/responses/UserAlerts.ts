import { Alert } from '@infinitylist/client/dist/typings'

export interface UserAlerts {
    count: number
    per_page: number
    results: {
        alerts: [Alert]
    }
}
