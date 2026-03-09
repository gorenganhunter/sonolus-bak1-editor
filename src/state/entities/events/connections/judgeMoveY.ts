import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { JudgeMoveYEventJointEntity } from '../joints/judgeMoveY'

export type JudgeMoveYEventConnectionEntity = BaseEventConnectionEntity<JudgeMoveYEventJointEntity> & {
    type: 'judgeMoveYEventConnection'
}

export const toJudgeMoveYEventConnectionEntity = (
    min: JudgeMoveYEventJointEntity,
    max: JudgeMoveYEventJointEntity,
): JudgeMoveYEventConnectionEntity => ({
    type: 'judgeMoveYEventConnection',
    ...toEventConnectionEntity(min, max),
})
