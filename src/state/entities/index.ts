import type { EventEntity } from './events'
import type { HoldNoteEntity } from './holdNotes'
import type { TapNoteEntity } from './tapNote'
import type { ValueEntity } from './values'

export type BaseEntity = {
    hitbox?: {
        lane: number
        beat: number
        w: number
        t: number
        b: number
    }

    beat: number
}

export type Entity = ValueEntity | EventEntity | TapNoteEntity | HoldNoteEntity

export type EntityType = Entity['type']

export type EntityOfType<T extends EntityType> = Entity & { type: T }
