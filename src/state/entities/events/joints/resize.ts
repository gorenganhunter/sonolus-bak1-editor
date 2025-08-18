import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp, remap } from '../../../../utils/math'

export type ResizeEventJointEntity = BaseEventJointEntity & {
    type: 'resizeEventJoint'
}

export const toResizeEventJointEntity = (object: EventObject): ResizeEventJointEntity => ({
    type: 'resizeEventJoint',
    ...toEventJointEntity(object, resizeEventValueToLane(object.value)),
})

export const resizeEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToResizeEventValue = (lane: number) => unlerp(0.5, 1, lane)
