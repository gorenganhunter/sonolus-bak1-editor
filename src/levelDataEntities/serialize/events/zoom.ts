import { serializeLevelDataEventEntities } from '.'
import type { ZoomEventConnectionEntity } from '../../../state/entities/events/connections/zoom'
import type { ZoomEventJointEntity } from '../../../state/entities/events/joints/zoom'

export const serializeLevelDataZoomEvents = (
    joints: ZoomEventJointEntity[],
    connections: ZoomEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'ZoomEvent')
