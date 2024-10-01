import { serializeLevelDataEventEntities } from '.'
import type { RotateEventConnectionEntity } from '../../../state/entities/events/connections/rotate'
import type { RotateEventJointEntity } from '../../../state/entities/events/joints/rotate'

export const serializeLevelDataRotateEvents = (
    joints: RotateEventJointEntity[],
    connections: RotateEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'RotateEvent')
