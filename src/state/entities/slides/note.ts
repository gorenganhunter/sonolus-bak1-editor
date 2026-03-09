import type { SlideId } from '.'
import type { BaseEntity } from '..'
import type {
    // ConnectorEase,
    // ConnectorGuideColor,
    // ConnectorLayer,
    // ConnectorType,
    NoteObject,
    // NoteSfx,
    NoteType,
} from '../../../chart'

export type NoteEntity = BaseEntity & {
    type: 'note'
    hitbox: object

    slideId: SlideId
    noteType: NoteType
    lane: number
    size: number
    stage: number
    isFake: boolean

    useInfoOf?: NoteEntity
}

export const toNoteEntity = (
    slideId: SlideId,
    object: NoteObject,
    useInfoOf?: NoteEntity,
): NoteEntity => ({
    type: 'note',
    hitbox: {
        lane: object.lane,
        beat: object.beat,
        w: object.size / 2,
        t: 0.25,
        b: 0.25
    },

    slideId,
    stage: object.stage,
    beat: object.beat,
    noteType: object.noteType,
    // isAttached: object.isAttached,
    lane: object.lane,
    size: object.size,
    // spawnLane: object.spawnLane,
    isFake: object.isFake,

    useInfoOf,
})
