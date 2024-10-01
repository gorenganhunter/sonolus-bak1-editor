import { addHoldNoteJoint, removeHoldNoteJoint } from '.'
import type { RemoveMutation } from '..'
import type { SingleHoldNoteJointObject } from '../../../chart'
import { type HoldNoteId } from '../../entities/holdNotes'
import { toSingleHoldNoteConnectionEntity } from '../../entities/holdNotes/connections/single'
import {
    type SingleHoldNoteJointEntity,
    toSingleHoldNoteJointEntity,
} from '../../entities/holdNotes/joints/single'
import type { Transaction } from '../../transaction'

export const addSingleHoldNoteJoint = (
    { store }: Transaction,
    id: HoldNoteId,
    object: SingleHoldNoteJointObject,
) =>
    addHoldNoteJoint(
        store,
        id,
        object,
        'singleHoldNoteJoint',
        toSingleHoldNoteJointEntity,
        'singleHoldNoteConnection',
        toSingleHoldNoteConnectionEntity,
    )

export const removeSingleHoldNoteJoint: RemoveMutation<SingleHoldNoteJointEntity> = (
    { store },
    joint,
) => {
    removeHoldNoteJoint(
        store,
        joint,
        'singleHoldNoteJoint',
        'singleHoldNoteConnection',
        toSingleHoldNoteConnectionEntity,
    )
}
