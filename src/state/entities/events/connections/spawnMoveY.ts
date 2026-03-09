import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { SpawnMoveYEventJointEntity } from '../joints/spawnMoveY'

export type SpawnMoveYEventConnectionEntity = BaseEventConnectionEntity<SpawnMoveYEventJointEntity> & {
    type: 'spawnMoveYEventConnection'
}

export const toSpawnMoveYEventConnectionEntity = (
    min: SpawnMoveYEventJointEntity,
    max: SpawnMoveYEventJointEntity,
): SpawnMoveYEventConnectionEntity => ({
    type: 'spawnMoveYEventConnection',
    ...toEventConnectionEntity(min, max),
})
