import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, unlerp } from '../../../../utils/math'

export type ZoomEventJointEntity = BaseEventJointEntity & {
    type: 'zoomEventJoint'
}

export const toZoomEventJointEntity = (object: EventObject): ZoomEventJointEntity => ({
    type: 'zoomEventJoint',
    ...toEventJointEntity(object, zoomEventValueToLane(object.value)),
})

export const zoomEventValueToLane = (value: number) => lerp(3.5, -0.5, value)

export const laneToZoomEventValue = (lane: number) => unlerp(3.5, -0.5, lane)
