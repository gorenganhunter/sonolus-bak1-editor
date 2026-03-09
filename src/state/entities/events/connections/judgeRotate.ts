import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { JudgeRotateEventJointEntity } from '../joints/judgeRotate'

export type JudgeRotateEventConnectionEntity = BaseEventConnectionEntity<JudgeRotateEventJointEntity> & {
    type: 'judgeRotateEventConnection'
}

export const toJudgeRotateEventConnectionEntity = (
    min: JudgeRotateEventJointEntity,
    max: JudgeRotateEventJointEntity,
): JudgeRotateEventConnectionEntity => ({
    type: 'judgeRotateEventConnection',
    ...toEventConnectionEntity(min, max),
})
