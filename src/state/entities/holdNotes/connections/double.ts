import { toHoldNoteConnectionEntity, type BaseHoldNoteConnectionEntity } from '.'
import type { DoubleHoldNoteJointEntity } from '../joints/double'

export type DoubleHoldNoteConnectionEntity =
    BaseHoldNoteConnectionEntity<DoubleHoldNoteJointEntity> & {
        type: 'doubleHoldNoteConnection'
    }

export const toDoubleHoldNoteConnectionEntity = (
    min: DoubleHoldNoteJointEntity,
    max: DoubleHoldNoteJointEntity,
): DoubleHoldNoteConnectionEntity => ({
    type: 'doubleHoldNoteConnection',
    ...toHoldNoteConnectionEntity(min, max),
})
