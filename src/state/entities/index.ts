import type { EventEntity } from './events'
import type { ConnectorEntity } from './slides/connector'
import type { NoteEntity } from './slides/note'
import type { ValueEntity } from './values'

export type EntityHitbox = {
    lane: number
    beat: number
    w: number
    t: number
    b: number
}

export type BaseEntity = {
    hitbox?: EntityHitbox

    beat: number
}

export type Entity = ValueEntity | EventEntity | NoteEntity | ConnectorEntity

export type EntityType = Entity['type']

export type EntityOfType<T extends EntityType> = Entity & { type: T }
