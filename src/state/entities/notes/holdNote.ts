import type { BaseEntity } from '..'
import type { HoldNoteObject } from '../../../chart'

export type HoldNoteEntity = BaseEntity & {
    type: 'holdNote'
    lane: number
    size: number
    stage: number
    duration: number
}

export const toHoldNoteEntity = (object: HoldNoteObject): HoldNoteEntity => ({
    type: 'holdNote',
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
    stage: object.stage,
    duration: object.duration,
})
