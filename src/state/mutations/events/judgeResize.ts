import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toJudgeResizeEventConnectionEntity } from '../../entities/events/connections/judgeResize'
import {
    toJudgeResizeEventJointEntity,
    type JudgeResizeEventJointEntity,
} from '../../entities/events/joints/judgeResize'

export const addJudgeResizeEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toJudgeResizeEventJointEntity,
        'judgeResizeEventConnection',
        toJudgeResizeEventConnectionEntity,
    )

export const removeJudgeResizeEventJoint: RemoveMutation<JudgeResizeEventJointEntity> = (
    { store },
    entity,
) => {
    removeEventJoint(store, entity, 'judgeResizeEventConnection', toJudgeResizeEventConnectionEntity)
}
