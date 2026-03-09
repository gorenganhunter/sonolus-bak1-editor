import { serializeLevelDataEventEntities } from '.'
import type { JudgeRotateEventConnectionEntity } from '../../../state/entities/events/connections/judgeRotate'
import type { JudgeRotateEventJointEntity } from '../../../state/entities/events/joints/judgeRotate'

export const serializeLevelDataJudgeRotateEvents = (
    joints: JudgeRotateEventJointEntity[],
    connections: JudgeRotateEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageJudgeRotateEvent')
