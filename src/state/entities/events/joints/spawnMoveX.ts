import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type SpawnMoveXEventJointEntity = BaseEventJointEntity & {
    type: 'spawnMoveXEventJoint'
}

export const toSpawnMoveXEventJointEntity = (object: EventObject): SpawnMoveXEventJointEntity => ({
    type: 'spawnMoveXEventJoint',
    ...toEventJointEntity(object, spawnMoveXEventValueToLane(object.value)),
})

export const spawnMoveXEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToSpawnMoveXEventValue = (lane: number) => unlerp(0.5, 1, lane)
