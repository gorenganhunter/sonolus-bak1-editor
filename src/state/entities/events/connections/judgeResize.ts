import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { JudgeResizeEventJointEntity } from '../joints/judgeResize'

export type JudgeResizeEventConnectionEntity = BaseEventConnectionEntity<JudgeResizeEventJointEntity> & {
    type: 'judgeResizeEventConnection'
}

export const toJudgeResizeEventConnectionEntity = (
    min: JudgeResizeEventJointEntity,
    max: JudgeResizeEventJointEntity,
): JudgeResizeEventConnectionEntity => ({
    type: 'judgeResizeEventConnection',
    ...toEventConnectionEntity(min, max),
})
