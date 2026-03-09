import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp, remap } from '../../../../utils/math'

export type JudgeResizeEventJointEntity = BaseEventJointEntity & {
    type: 'judgeResizeEventJoint'
}

export const toJudgeResizeEventJointEntity = (object: EventObject): JudgeResizeEventJointEntity => ({
    type: 'judgeResizeEventJoint',
    ...toEventJointEntity(object, judgeResizeEventValueToLane(object.value)),
})

export const judgeResizeEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToJudgeResizeEventValue = (lane: number) => unlerp(0.5, 1, lane)
