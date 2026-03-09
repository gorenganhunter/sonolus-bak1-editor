import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type JudgeMoveXEventJointEntity = BaseEventJointEntity & {
    type: 'judgeMoveXEventJoint'
}

export const toJudgeMoveXEventJointEntity = (object: EventObject): JudgeMoveXEventJointEntity => ({
    type: 'judgeMoveXEventJoint',
    ...toEventJointEntity(object, judgeMoveXEventValueToLane(object.value)),
})

export const judgeMoveXEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToJudgeMoveXEventValue = (lane: number) => unlerp(0.5, 1, lane)
