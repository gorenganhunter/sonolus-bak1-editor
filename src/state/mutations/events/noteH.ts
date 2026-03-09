import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toNoteHEventConnectionEntity } from '../../entities/events/connections/noteH'
import {
    toNoteHEventJointEntity,
    type NoteHEventJointEntity,
} from '../../entities/events/joints/noteH'

export const addNoteHEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toNoteHEventJointEntity,
        'noteHEventConnection',
        toNoteHEventConnectionEntity,
    )

export const removeNoteHEventJoint: RemoveMutation<NoteHEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'noteHEventConnection', toNoteHEventConnectionEntity)
}
