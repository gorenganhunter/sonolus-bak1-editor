import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { mod } from '../../../../utils/math'

export type JudgeRotateEventJointEntity = BaseEventJointEntity & {
    type: 'judgeRotateEventJoint'
}

export const toJudgeRotateEventJointEntity = (object: EventObject): JudgeRotateEventJointEntity => ({
    type: 'judgeRotateEventJoint',
    ...toEventJointEntity(object, judgeRotateEventValueToLane(object.value)),
})

export const judgeRotateEventValueToLane = (value: number) => {
    // //console.log(value)
    while (true) {
        if (value < 0) value += 360
        else break
    }
    return ((value + 180) % 360) / 360
}
