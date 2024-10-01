import { serializeLevelDataHoldNoteEntities } from '.'
import type { SingleHoldNoteConnectionEntity } from '../../../state/entities/holdNotes/connections/single'
import type { SingleHoldNoteJointEntity } from '../../../state/entities/holdNotes/joints/single'

export const serializeLevelDataSingleHoldNotes = (
    joints: SingleHoldNoteJointEntity[],
    connections: SingleHoldNoteConnectionEntity[],
    getName: () => string,
) =>
    serializeLevelDataHoldNoteEntities(
        joints,
        connections,
        getName,
        'SingleHoldNote',
        (joint) => [
            {
                name: 'lane',
                value: joint.lane,
            },
            {
                name: 'scaleL',
                value: joint.scaleL,
            },
            {
                name: 'scaleR',
                value: joint.scaleR,
            },
        ],
        'SingleHoldConnector',
    )
