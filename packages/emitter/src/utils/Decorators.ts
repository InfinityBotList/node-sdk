import { EventEmitter } from '../emitters/EventEmitter'
import { ExtendedEmitter } from '../emitters/ExtendedEmitter'

export const eventMapper = Symbol('__event_map')

// export enum EventMapperType {

// }

export interface EventMapperOptions {
    event: string
    method: string | Function
    type: 'on' | 'once'
}

type EMITTER = EventEmitter<any> | ExtendedEmitter

function addEvent(target: EMITTER, method: string, event: string, type: 'on' | 'once') {
    if (target[eventMapper] === undefined) {
        target[eventMapper] = []
    } else if (!target.hasOwnProperty(eventMapper)) {
        target[eventMapper] = [...target[eventMapper]]
    }

    target[eventMapper]!.push({
        event,
        method,
        type
    })
}

export function Event(event: string) {
    return function (target: EMITTER, method: string) {
        addEvent(target, method, event, 'on')
    }
}

export function Once(event: string) {
    return function (target: EMITTER, method: string) {
        addEvent(target, method, event, 'once')
    }
}
