import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type JudgeMoveYEventJointEntity = BaseEventJointEntity & {
    type: 'judgeMoveYEventJoint'
}

export const toJudgeMoveYEventJointEntity = (object: EventObject): JudgeMoveYEventJointEntity => ({
    type: 'judgeMoveYEventJoint',
    ...toEventJointEntity(object, judgeMoveYEventValueToLane(object.value)),
})

export const judgeMoveYEventValueToLane = (value: number) => lerp(0.5, 1, value)

export const laneToJudgeMoveYEventValue = (lane: number) => unlerp(0.5, 1, lane)
