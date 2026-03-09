import { serializeLevelDataEventEntities } from '.'
import type { SpawnRotateEventConnectionEntity } from '../../../state/entities/events/connections/spawnRotate'
import type { SpawnRotateEventJointEntity } from '../../../state/entities/events/joints/spawnRotate'

export const serializeLevelDataSpawnRotateEvents = (
    joints: SpawnRotateEventJointEntity[],
    connections: SpawnRotateEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageSpawnRotateEvent')
