import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { mod } from '../../../../utils/math'

export type RotateEventJointEntity = BaseEventJointEntity & {
    type: 'rotateEventJoint'
}

export const toRotateEventJointEntity = (object: EventObject): RotateEventJointEntity => ({
    type: 'rotateEventJoint',
    ...toEventJointEntity(object, rotateEventValueToLane(object.value)),
})

export const rotateEventValueToLane = (value: number) => mod(-value + 0.5, 8) - 0.5
