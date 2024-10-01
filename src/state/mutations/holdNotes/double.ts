import { addHoldNoteJoint, removeHoldNoteJoint } from '.'
import type { RemoveMutation } from '..'
import type { DoubleHoldNoteJointObject } from '../../../chart'
import { type HoldNoteId } from '../../entities/holdNotes'
import { toDoubleHoldNoteConnectionEntity } from '../../entities/holdNotes/connections/double'
import {
    type DoubleHoldNoteJointEntity,
    toDoubleHoldNoteJointEntity,
} from '../../entities/holdNotes/joints/double'
import type { Transaction } from '../../transaction'

export const addDoubleHoldNoteJoint = (
    { store }: Transaction,
    id: HoldNoteId,
    object: DoubleHoldNoteJointObject,
) =>
    addHoldNoteJoint(
        store,
        id,
        object,
        'doubleHoldNoteJoint',
        toDoubleHoldNoteJointEntity,
        'doubleHoldNoteConnection',
        toDoubleHoldNoteConnectionEntity,
    )

export const removeDoubleHoldNoteJoint: RemoveMutation<DoubleHoldNoteJointEntity> = (
    { store },
    joint,
) => {
    removeHoldNoteJoint(
        store,
        joint,
        'doubleHoldNoteJoint',
        'doubleHoldNoteConnection',
        toDoubleHoldNoteConnectionEntity,
    )
}
