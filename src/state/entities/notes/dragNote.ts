import type { BaseEntity } from '..'
import type { BaseNoteObject } from '../../../chart'

export type DragNoteEntity = BaseEntity & {
    type: 'dragNote'
    lane: number
    size: number
    stage: number
}

export const toDragNoteEntity = (object: BaseNoteObject): DragNoteEntity => ({
    type: 'dragNote',
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
