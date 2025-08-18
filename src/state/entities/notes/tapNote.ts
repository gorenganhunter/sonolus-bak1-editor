import type { BaseEntity } from '..'
import type { BaseNoteObject } from '../../../chart'

export type TapNoteEntity = BaseEntity & {
    type: 'tapNote'
    lane: number
    size: number
    stage: number
}

export const toTapNoteEntity = (object: BaseNoteObject): TapNoteEntity => ({
    type: 'tapNote',
    hitbox: {
        lane: object.lane,
        beat: object.beat,
        w: object.size,
        t: 0.25,
        b: 0.25,
    },

    beat: object.beat,
    lane: object.lane,
    size: object.size,
    stage: object.stage
})
