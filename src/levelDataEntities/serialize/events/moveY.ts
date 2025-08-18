import { serializeLevelDataEventEntities } from '.'
import type { MoveYEventConnectionEntity } from '../../../state/entities/events/connections/moveY'
import type { MoveYEventJointEntity } from '../../../state/entities/events/joints/moveY'

export const serializeLevelDataMoveYEvents = (
    joints: MoveYEventJointEntity[],
    connections: MoveYEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageMoveYEvent')
