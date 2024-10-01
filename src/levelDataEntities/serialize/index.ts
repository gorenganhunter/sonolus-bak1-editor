import type { LevelDataEntity } from '@sonolus/core'
import type { RotateEventConnectionEntity } from '../../state/entities/events/connections/rotate'
import type { ShiftEventConnectionEntity } from '../../state/entities/events/connections/shift'
import type { ZoomEventConnectionEntity } from '../../state/entities/events/connections/zoom'
import type { RotateEventJointEntity } from '../../state/entities/events/joints/rotate'
import type { ShiftEventJointEntity } from '../../state/entities/events/joints/shift'
import type { ZoomEventJointEntity } from '../../state/entities/events/joints/zoom'
import type { DoubleHoldNoteConnectionEntity } from '../../state/entities/holdNotes/connections/double'
import type { SingleHoldNoteConnectionEntity } from '../../state/entities/holdNotes/connections/single'
import type { DoubleHoldNoteJointEntity } from '../../state/entities/holdNotes/joints/double'
import type { SingleHoldNoteJointEntity } from '../../state/entities/holdNotes/joints/single'
import type { TapNoteEntity } from '../../state/entities/tapNote'
import type { BpmEntity } from '../../state/entities/values/bpm'
import type { TimeScaleEntity } from '../../state/entities/values/timeScale'
import { serializeLevelDataRotateEvents } from './events/rotate'
import { serializeLevelDataShiftEvents } from './events/shift'
import { serializeLevelDataZoomEvents } from './events/zoom'
import { serializeLevelDataDoubleHoldNotes } from './holdNotes/double'
import { serializeLevelDataSingleHoldNotes } from './holdNotes/single'
import { serializeLevelDataTapNotes } from './tapNote'
import { serializeLevelDataBpms } from './values/bpm'
import { serializeLevelDataTimeScales } from './values/timeScale'

export const serializeLevelDataEntities = (
    bpms: BpmEntity[],
    timeScales: TimeScaleEntity[],

    rotateEventJoints: RotateEventJointEntity[],
    rotateEventConnections: RotateEventConnectionEntity[],
    shiftEventJoints: ShiftEventJointEntity[],
    shiftEventConnections: ShiftEventConnectionEntity[],
    zoomEventJoints: ZoomEventJointEntity[],
    zoomEventConnections: ZoomEventConnectionEntity[],

    tapNotes: TapNoteEntity[],

    singleHoldNoteJoints: SingleHoldNoteJointEntity[],
    singleHoldNoteConnections: SingleHoldNoteConnectionEntity[],
    doubleHoldNoteJoints: DoubleHoldNoteJointEntity[],
    doubleHoldNoteConnections: DoubleHoldNoteConnectionEntity[],
): LevelDataEntity[] => {
    let id = 0
    const getName = () => (id++).toString(16)

    return [
        ...serializeLevelDataBpms(bpms),
        ...serializeLevelDataTimeScales(timeScales),

        ...serializeLevelDataRotateEvents(rotateEventJoints, rotateEventConnections, getName),
        ...serializeLevelDataShiftEvents(shiftEventJoints, shiftEventConnections, getName),
        ...serializeLevelDataZoomEvents(zoomEventJoints, zoomEventConnections, getName),

        ...serializeLevelDataTapNotes(tapNotes),

        ...serializeLevelDataSingleHoldNotes(
            singleHoldNoteJoints,
            singleHoldNoteConnections,
            getName,
        ),
        ...serializeLevelDataDoubleHoldNotes(
            doubleHoldNoteJoints,
            doubleHoldNoteConnections,
            getName,
        ),
    ]
}
