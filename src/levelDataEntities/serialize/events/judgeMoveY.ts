import { serializeLevelDataEventEntities } from '.'
import type { JudgeMoveYEventConnectionEntity } from '../../../state/entities/events/connections/judgeMoveY'
import type { JudgeMoveYEventJointEntity } from '../../../state/entities/events/joints/judgeMoveY'

export const serializeLevelDataJudgeMoveYEvents = (
    joints: JudgeMoveYEventJointEntity[],
    connections: JudgeMoveYEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageJudgeMoveYEvent')
