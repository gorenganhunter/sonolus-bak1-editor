import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { SpawnResizeEventJointEntity } from '../joints/spawnResize'

export type SpawnResizeEventConnectionEntity = BaseEventConnectionEntity<SpawnResizeEventJointEntity> & {
    type: 'spawnResizeEventConnection'
}

export const toSpawnResizeEventConnectionEntity = (
    min: SpawnResizeEventJointEntity,
    max: SpawnResizeEventJointEntity,
): SpawnResizeEventConnectionEntity => ({
    type: 'spawnResizeEventConnection',
    ...toEventConnectionEntity(min, max),
})
