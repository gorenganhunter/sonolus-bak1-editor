import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { SpawnMoveXEventJointEntity } from '../joints/spawnMoveX'

export type SpawnMoveXEventConnectionEntity = BaseEventConnectionEntity<SpawnMoveXEventJointEntity> & {
    type: 'spawnMoveXEventConnection'
}

export const toSpawnMoveXEventConnectionEntity = (
    min: SpawnMoveXEventJointEntity,
    max: SpawnMoveXEventJointEntity,
): SpawnMoveXEventConnectionEntity => ({
    type: 'spawnMoveXEventConnection',
    ...toEventConnectionEntity(min, max),
})
