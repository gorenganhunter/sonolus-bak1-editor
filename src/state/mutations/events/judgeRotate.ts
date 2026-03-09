import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toJudgeRotateEventConnectionEntity } from '../../entities/events/connections/judgeRotate'
import {
    toJudgeRotateEventJointEntity,
    type JudgeRotateEventJointEntity,
} from '../../entities/events/joints/judgeRotate'

export const addJudgeRotateEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toJudgeRotateEventJointEntity,
        'judgeRotateEventConnection',
        toJudgeRotateEventConnectionEntity,
    )

export const removeJudgeRotateEventJoint: RemoveMutation<JudgeRotateEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'judgeRotateEventConnection', toJudgeRotateEventConnectionEntity)
}
