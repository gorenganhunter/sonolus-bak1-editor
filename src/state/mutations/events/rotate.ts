import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toRotateEventConnectionEntity } from '../../entities/events/connections/rotate'
import {
    toRotateEventJointEntity,
    type RotateEventJointEntity,
} from '../../entities/events/joints/rotate'

export const addRotateEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toRotateEventJointEntity,
        'rotateEventConnection',
        toRotateEventConnectionEntity,
    )

export const removeRotateEventJoint: RemoveMutation<RotateEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'rotateEventConnection', toRotateEventConnectionEntity)
}
