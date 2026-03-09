import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { JudgeMoveXEventJointEntity } from '../joints/judgeMoveX'

export type JudgeMoveXEventConnectionEntity = BaseEventConnectionEntity<JudgeMoveXEventJointEntity> & {
    type: 'judgeMoveXEventConnection'
}

export const toJudgeMoveXEventConnectionEntity = (
    min: JudgeMoveXEventJointEntity,
    max: JudgeMoveXEventJointEntity,
): JudgeMoveXEventConnectionEntity => ({
    type: 'judgeMoveXEventConnection',
    ...toEventConnectionEntity(min, max),
})
