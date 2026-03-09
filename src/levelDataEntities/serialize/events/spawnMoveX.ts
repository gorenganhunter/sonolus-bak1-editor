import { serializeLevelDataEventEntities } from '.'
import type { SpawnMoveXEventConnectionEntity } from '../../../state/entities/events/connections/spawnMoveX'
import type { SpawnMoveXEventJointEntity } from '../../../state/entities/events/joints/spawnMoveX'

export const serializeLevelDataSpawnMoveXEvents = (
    joints: SpawnMoveXEventJointEntity[],
    connections: SpawnMoveXEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageSpawnMoveXEvent')
