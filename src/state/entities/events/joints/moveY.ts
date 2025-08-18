import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type MoveYEventJointEntity = BaseEventJointEntity & {
    type: 'moveYEventJoint'
}

export const toMoveYEventJointEntity = (object: EventObject): MoveYEventJointEntity => ({
    type: 'moveYEventJoint',
    ...toEventJointEntity(object, moveYEventValueToLane(object.value)),
})

export const moveYEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToMoveYEventValue = (lane: number) => unlerp(0.5, 1, lane)
