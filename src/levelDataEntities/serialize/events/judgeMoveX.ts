import { serializeLevelDataEventEntities } from '.'
import type { JudgeMoveXEventConnectionEntity } from '../../../state/entities/events/connections/judgeMoveX'
import type { JudgeMoveXEventJointEntity } from '../../../state/entities/events/joints/judgeMoveX'

export const serializeLevelDataJudgeMoveXEvents = (
    joints: JudgeMoveXEventJointEntity[],
    connections: JudgeMoveXEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageJudgeMoveXEvent')
