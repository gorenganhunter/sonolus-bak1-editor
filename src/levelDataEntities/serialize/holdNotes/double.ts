import { serializeLevelDataHoldNoteEntities } from '.'
import type { DoubleHoldNoteConnectionEntity } from '../../../state/entities/holdNotes/connections/double'
import type { DoubleHoldNoteJointEntity } from '../../../state/entities/holdNotes/joints/double'

export const serializeLevelDataDoubleHoldNotes = (
    joints: DoubleHoldNoteJointEntity[],
    connections: DoubleHoldNoteConnectionEntity[],
    getName: () => string,
) =>
    serializeLevelDataHoldNoteEntities(
        joints,
        connections,
        getName,
        'DoubleHoldNote',
        (joint) => [
            {
                name: 'laneL',
                value: joint.laneL,
            },
            {
                name: 'laneR',
                value: joint.laneR,
            },
        ],
        'DoubleHoldConnector',
    )
