import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type MoveXEventJointEntity = BaseEventJointEntity & {
    type: 'moveXEventJoint'
}

export const toMoveXEventJointEntity = (object: EventObject): MoveXEventJointEntity => ({
    type: 'moveXEventJoint',
    ...toEventJointEntity(object, moveXEventValueToLane(object.value)),
})

export const moveXEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToMoveXEventValue = (lane: number) => unlerp(0.5, 1, lane)
