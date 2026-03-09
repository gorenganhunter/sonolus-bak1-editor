import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { NoteHEventJointEntity } from '../joints/noteH'

export type NoteHEventConnectionEntity = BaseEventConnectionEntity<NoteHEventJointEntity> & {
    type: 'noteHEventConnection'
}

export const toNoteHEventConnectionEntity = (
    min: NoteHEventJointEntity,
    max: NoteHEventJointEntity,
): NoteHEventConnectionEntity => ({
    type: 'noteHEventConnection',
    ...toEventConnectionEntity(min, max),
})
