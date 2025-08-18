import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toMoveXEventConnectionEntity } from '../../entities/events/connections/moveX'
import {
    toMoveXEventJointEntity,
    type MoveXEventJointEntity,
} from '../../entities/events/joints/moveX'

export const addMoveXEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toMoveXEventJointEntity,
        'moveXEventConnection',
        toMoveXEventConnectionEntity,
    )

export const removeMoveXEventJoint: RemoveMutation<MoveXEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'moveXEventConnection', toMoveXEventConnectionEntity)
}
