import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toJudgeMoveXEventConnectionEntity } from '../../entities/events/connections/judgeMoveX'
import {
    toJudgeMoveXEventJointEntity,
    type JudgeMoveXEventJointEntity,
} from '../../entities/events/joints/judgeMoveX'

export const addJudgeMoveXEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toJudgeMoveXEventJointEntity,
        'judgeMoveXEventConnection',
        toJudgeMoveXEventConnectionEntity,
    )

export const removeJudgeMoveXEventJoint: RemoveMutation<JudgeMoveXEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'judgeMoveXEventConnection', toJudgeMoveXEventConnectionEntity)
}
