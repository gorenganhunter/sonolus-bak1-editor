import { serializeLevelDataEventEntities } from '.'
import type { SpawnResizeEventConnectionEntity } from '../../../state/entities/events/connections/spawnResize'
import type { SpawnResizeEventJointEntity } from '../../../state/entities/events/joints/spawnResize'

export const serializeLevelDataSpawnResizeEvents = (
    joints: SpawnResizeEventJointEntity[],
    connections: SpawnResizeEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageSpawnResizeEvent')
