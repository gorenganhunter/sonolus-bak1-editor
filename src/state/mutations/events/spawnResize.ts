import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toSpawnResizeEventConnectionEntity } from '../../entities/events/connections/spawnResize'
import {
    toSpawnResizeEventJointEntity,
    type SpawnResizeEventJointEntity,
} from '../../entities/events/joints/spawnResize'

export const addSpawnResizeEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toSpawnResizeEventJointEntity,
        'spawnResizeEventConnection',
        toSpawnResizeEventConnectionEntity,
    )

export const removeSpawnResizeEventJoint: RemoveMutation<SpawnResizeEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'spawnResizeEventConnection', toSpawnResizeEventConnectionEntity)
}
