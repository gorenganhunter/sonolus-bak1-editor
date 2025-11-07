import type { EventEntity } from './events'
import type { DragNoteEntity } from './notes/dragNote'
import type { FlickNoteEntity } from './notes/flickNote'
import type { HoldNoteEntity } from './notes/holdNote'
import type { TapNoteEntity } from './notes/tapNote'
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

export type Entity = ValueEntity | EventEntity | TapNoteEntity | HoldNoteEntity | DragNoteEntity | FlickNoteEntity

export type EntityType = Entity['type']

export type EntityOfType<T extends EntityType> = Entity & { type: T }
