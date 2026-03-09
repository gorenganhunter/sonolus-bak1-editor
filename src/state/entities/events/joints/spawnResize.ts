import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp, remap } from '../../../../utils/math'

export type SpawnResizeEventJointEntity = BaseEventJointEntity & {
    type: 'spawnResizeEventJoint'
}

export const toSpawnResizeEventJointEntity = (object: EventObject): SpawnResizeEventJointEntity => ({
    type: 'spawnResizeEventJoint',
    ...toEventJointEntity(object, spawnResizeEventValueToLane(object.value)),
})

export const spawnResizeEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToSpawnResizeEventValue = (lane: number) => unlerp(0.5, 1, lane)
