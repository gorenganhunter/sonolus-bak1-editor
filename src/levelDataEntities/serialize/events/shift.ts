import { serializeLevelDataEventEntities } from '.'
import type { ShiftEventConnectionEntity } from '../../../state/entities/events/connections/shift'
import type { ShiftEventJointEntity } from '../../../state/entities/events/joints/shift'

export const serializeLevelDataShiftEvents = (
    joints: ShiftEventJointEntity[],
    connections: ShiftEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'ShiftEvent')
