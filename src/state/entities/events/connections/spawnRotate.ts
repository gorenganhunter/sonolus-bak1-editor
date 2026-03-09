import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { SpawnRotateEventJointEntity } from '../joints/spawnRotate'

export type SpawnRotateEventConnectionEntity = BaseEventConnectionEntity<SpawnRotateEventJointEntity> & {
    type: 'spawnRotateEventConnection'
}

export const toSpawnRotateEventConnectionEntity = (
    min: SpawnRotateEventJointEntity,
    max: SpawnRotateEventJointEntity,
): SpawnRotateEventConnectionEntity => ({
    type: 'spawnRotateEventConnection',
    ...toEventConnectionEntity(min, max),
})
