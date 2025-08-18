import { serializeLevelDataEventEntities } from '.'
import type { TransparentEventConnectionEntity } from '../../../state/entities/events/connections/transparent'
import type { TransparentEventJointEntity } from '../../../state/entities/events/joints/transparent'

export const serializeLevelDataTransparentEvents = (
    joints: TransparentEventJointEntity[],
    connections: TransparentEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageTransparentEvent')
