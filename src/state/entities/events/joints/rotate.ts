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

export const rotateEventValueToLane = (value: number) => {
    // console.log(value)
    while (true) {
        if (value < 0) value += 360
        else break
    }
    return (value % 360) / 360
}
