import { toHoldNoteConnectionEntity, type BaseHoldNoteConnectionEntity } from '.'
import type { SingleHoldNoteJointEntity } from '../joints/single'

export type SingleHoldNoteConnectionEntity =
    BaseHoldNoteConnectionEntity<SingleHoldNoteJointEntity> & {
        type: 'singleHoldNoteConnection'
    }

export const toSingleHoldNoteConnectionEntity = (
    min: SingleHoldNoteJointEntity,
    max: SingleHoldNoteJointEntity,
): SingleHoldNoteConnectionEntity => ({
    type: 'singleHoldNoteConnection',
    ...toHoldNoteConnectionEntity(min, max),
})
