import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, unlerp } from '../../../../utils/math'

export type ShiftEventJointEntity = BaseEventJointEntity & {
    type: 'shiftEventJoint'
}

export const toShiftEventJointEntity = (object: EventObject): ShiftEventJointEntity => ({
    type: 'shiftEventJoint',
    ...toEventJointEntity(object, shiftEventValueToLane(object.value)),
})

export const shiftEventValueToLane = (value: number) => lerp(3.5, 7.5, value)

export const laneToShiftEventValue = (lane: number) => unlerp(3.5, 7.5, lane)
