import { serializeLevelDataEventEntities } from '.'
import type { JudgeResizeEventConnectionEntity } from '../../../state/entities/events/connections/judgeResize'
import type { JudgeResizeEventJointEntity } from '../../../state/entities/events/joints/judgeResize'

export const serializeLevelDataJudgeResizeEvents = (
    joints: JudgeResizeEventJointEntity[],
    connections: JudgeResizeEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageJudgeResizeEvent')
