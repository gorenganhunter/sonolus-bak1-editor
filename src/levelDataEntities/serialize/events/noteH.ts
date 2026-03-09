import { serializeLevelDataEventEntities } from '.'
import type { NoteHEventConnectionEntity } from '../../../state/entities/events/connections/noteH'
import type { NoteHEventJointEntity } from '../../../state/entities/events/joints/noteH'

export const serializeLevelDataNoteHEvents = (
    joints: NoteHEventJointEntity[],
    connections: NoteHEventConnectionEntity[],
    getName: () => string,
) => serializeLevelDataEventEntities(joints, connections, getName, 'StageNoteHEvent')
