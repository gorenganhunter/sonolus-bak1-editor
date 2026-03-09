import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type SpawnMoveYEventJointEntity = BaseEventJointEntity & {
    type: 'spawnMoveYEventJoint'
}

export const toSpawnMoveYEventJointEntity = (object: EventObject): SpawnMoveYEventJointEntity => ({
    type: 'spawnMoveYEventJoint',
    ...toEventJointEntity(object, spawnMoveYEventValueToLane(object.value)),
})

export const spawnMoveYEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToSpawnMoveYEventValue = (lane: number) => unlerp(0.5, 1, lane)
