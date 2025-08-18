import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toTransparentEventConnectionEntity } from '../../entities/events/connections/transparent'
import {
    toTransparentEventJointEntity,
    type TransparentEventJointEntity,
} from '../../entities/events/joints/transparent'

export const addTransparentEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toTransparentEventJointEntity,
        'transparentEventConnection',
        toTransparentEventConnectionEntity,
    )

export const removeTransparentEventJoint: RemoveMutation<TransparentEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'transparentEventConnection', toTransparentEventConnectionEntity)
}
