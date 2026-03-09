import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toSpawnMoveXEventConnectionEntity } from '../../entities/events/connections/spawnMoveX'
import {
    toSpawnMoveXEventJointEntity,
    type SpawnMoveXEventJointEntity,
} from '../../entities/events/joints/spawnMoveX'

export const addSpawnMoveXEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toSpawnMoveXEventJointEntity,
        'spawnMoveXEventConnection',
        toSpawnMoveXEventConnectionEntity,
    )

export const removeSpawnMoveXEventJoint: RemoveMutation<SpawnMoveXEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'spawnMoveXEventConnection', toSpawnMoveXEventConnectionEntity)
}
