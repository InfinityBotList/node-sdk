import { eventMapper, EventMapperOptions } from './Decorators'
import { EventEmitter } from 'events'

export const applyToEmitter = (
    emitter: EventEmitter,
    opts: EventMapperOptions[] | { [eventMapper]: EventMapperOptions[] }
) => {
    if (!Array.isArray(opts)) opts = opts[eventMapper]

    opts.forEach(opt => {
        emitter[opt.type](opt.event, typeof opt.method === 'string' ? emitter[opt.method].bind(emitter) : opt.method)
    })
}
