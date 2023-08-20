import { applyToEmitter } from '../utils/applyToEmitter'
import { eventMapper, EventMapperOptions } from '../utils/Decorators'

import { EventEmitter } from 'events'

export class ExtendedEmitter {
    static [eventMapper]: EventMapperOptions[];
    [eventMapper]: EventMapperOptions[]

    static add(emitter: EventEmitter) {
        applyToEmitter(
            emitter,
            this[eventMapper].map(x => ({ ...x, method: this[String(x.method)].bind(this) }))
        )
    }

    add(emitter: EventEmitter) {
        ExtendedEmitter.add.bind(this)(emitter)
    }
}
