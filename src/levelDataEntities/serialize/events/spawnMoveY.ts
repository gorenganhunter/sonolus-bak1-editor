import { serializeLevelDataEventEntities } from '.'
import type { SpawnMoveYEventConnectionEntity } from '../../../state/entities/events/connections/spawnMoveY'
import type { SpawnMoveYEventJointEntity } from '../../../state/entities/events/joints/spawnMoveY'

export const serializeLevelDataSpawnMoveYEvents = (
    joints: SpawnMoveYEventJointEntity[],
    connections: SpawnMoveYEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageSpawnMoveYEvent')
