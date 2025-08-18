import { serializeLevelDataEventEntities } from '.'
import type { ResizeEventConnectionEntity } from '../../../state/entities/events/connections/resize'
import type { ResizeEventJointEntity } from '../../../state/entities/events/joints/resize'

export const serializeLevelDataResizeEvents = (
    joints: ResizeEventJointEntity[],
    connections: ResizeEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageResizeEvent')
