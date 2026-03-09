import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toSpawnMoveYEventConnectionEntity } from '../../entities/events/connections/spawnMoveY'
import {
    toSpawnMoveYEventJointEntity,
    type SpawnMoveYEventJointEntity,
} from '../../entities/events/joints/spawnMoveY'

export const addSpawnMoveYEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toSpawnMoveYEventJointEntity,
        'spawnMoveYEventConnection',
        toSpawnMoveYEventConnectionEntity,
    )

export const removeSpawnMoveYEventJoint: RemoveMutation<SpawnMoveYEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'spawnMoveYEventConnection', toSpawnMoveYEventConnectionEntity)
}
