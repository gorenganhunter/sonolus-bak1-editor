import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toShiftEventConnectionEntity } from '../../entities/events/connections/shift'
import {
    toShiftEventJointEntity,
    type ShiftEventJointEntity,
} from '../../entities/events/joints/shift'

export const addShiftEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toShiftEventJointEntity,
        'shiftEventConnection',
        toShiftEventConnectionEntity,
    )

export const removeShiftEventJoint: RemoveMutation<ShiftEventJointEntity> = ({ store }, entity) => {
    removeEventJoint(store, entity, 'shiftEventConnection', toShiftEventConnectionEntity)
}
