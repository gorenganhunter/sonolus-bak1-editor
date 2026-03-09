import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toSpawnRotateEventConnectionEntity } from '../../entities/events/connections/spawnRotate'
import {
    toSpawnRotateEventJointEntity,
    type SpawnRotateEventJointEntity,
} from '../../entities/events/joints/spawnRotate'

export const addSpawnRotateEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toSpawnRotateEventJointEntity,
        'spawnRotateEventConnection',
        toSpawnRotateEventConnectionEntity,
    )

export const removeSpawnRotateEventJoint: RemoveMutation<SpawnRotateEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'spawnRotateEventConnection', toSpawnRotateEventConnectionEntity)
}
