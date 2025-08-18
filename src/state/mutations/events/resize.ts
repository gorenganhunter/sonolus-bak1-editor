import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toResizeEventConnectionEntity } from '../../entities/events/connections/resize'
import {
    toResizeEventJointEntity,
    type ResizeEventJointEntity,
} from '../../entities/events/joints/resize'

export const addResizeEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toResizeEventJointEntity,
        'resizeEventConnection',
        toResizeEventConnectionEntity,
    )

export const removeResizeEventJoint: RemoveMutation<ResizeEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'resizeEventConnection', toResizeEventConnectionEntity)
}
