import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toMoveYEventConnectionEntity } from '../../entities/events/connections/moveY'
import {
    toMoveYEventJointEntity,
    type MoveYEventJointEntity,
} from '../../entities/events/joints/moveY'

export const addMoveYEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toMoveYEventJointEntity,
        'moveYEventConnection',
        toMoveYEventConnectionEntity,
    )

export const removeMoveYEventJoint: RemoveMutation<MoveYEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'moveYEventConnection', toMoveYEventConnectionEntity)
}
