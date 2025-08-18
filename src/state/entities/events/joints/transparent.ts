import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type TransparentEventJointEntity = BaseEventJointEntity & {
    type: 'transparentEventJoint'
}

export const toTransparentEventJointEntity = (object: EventObject): TransparentEventJointEntity => ({
    type: 'transparentEventJoint',
    ...toEventJointEntity(object, transparentEventValueToLane(object.value)),
})

export const transparentEventValueToLane = (value: number) => lerp(0.5, 0, value)

export const laneToTransparentEventValue = (lane: number) => unlerp(0.5, 0, lane)
