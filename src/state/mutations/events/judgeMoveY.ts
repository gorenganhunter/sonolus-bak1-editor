import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toJudgeMoveYEventConnectionEntity } from '../../entities/events/connections/judgeMoveY'
import {
    toJudgeMoveYEventJointEntity,
    type JudgeMoveYEventJointEntity,
} from '../../entities/events/joints/judgeMoveY'

export const addJudgeMoveYEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toJudgeMoveYEventJointEntity,
        'judgeMoveYEventConnection',
        toJudgeMoveYEventConnectionEntity,
    )

export const removeJudgeMoveYEventJoint: RemoveMutation<JudgeMoveYEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'judgeMoveYEventConnection', toJudgeMoveYEventConnectionEntity)
}
