import { serializeLevelDataEventEntities } from '.'
import type { MoveXEventConnectionEntity } from '../../../state/entities/events/connections/moveX'
import type { MoveXEventJointEntity } from '../../../state/entities/events/joints/moveX'

export const serializeLevelDataMoveXEvents = (
    joints: MoveXEventJointEntity[],
    connections: MoveXEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageMoveXEvent')
