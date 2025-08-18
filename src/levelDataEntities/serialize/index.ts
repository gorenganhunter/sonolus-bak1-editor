import type { LevelDataEntity } from '@sonolus/core'
import type { RotateEventConnectionEntity } from '../../state/entities/events/connections/rotate'
import type { RotateEventJointEntity } from '../../state/entities/events/joints/rotate'
import type { TapNoteEntity } from '../../state/entities/notes/tapNote'
import type { HoldNoteEntity } from '../../state/entities/notes/holdNote'
import type { DragNoteEntity } from '../../state/entities/notes/dragNote'
import type { FlickNoteEntity } from '../../state/entities/notes/flickNote'
import type { BpmEntity } from '../../state/entities/values/bpm'
import type { TimeScaleEntity } from '../../state/entities/values/timeScale'
import { serializeLevelDataRotateEvents } from './events/rotate'
import { serializeLevelDataTapNotes } from './notes/tapNote'
import { serializeLevelDataHoldNotes } from './notes/holdNote'
import { serializeLevelDataDragNotes } from './notes/dragNote'
import { serializeLevelDataFlickNotes } from './notes/flickNote'
import { serializeLevelDataBpms } from './values/bpm'
// import { serializeLevelDataTimeScales } from './values/timeScale'
import type { RectStageObject } from '../../chart'
import { serializeLevelDataRectStages } from './stage'
import type { ResizeEventJointEntity } from '../../state/entities/events/joints/resize'
import type { ResizeEventConnectionEntity } from '../../state/entities/events/connections/resize'
import type { TransparentEventJointEntity } from '../../state/entities/events/joints/transparent'
import type { TransparentEventConnectionEntity } from '../../state/entities/events/connections/transparent'
import type { MoveXEventJointEntity } from '../../state/entities/events/joints/moveX'
import type { MoveXEventConnectionEntity } from '../../state/entities/events/connections/moveX'
import type { MoveYEventJointEntity } from '../../state/entities/events/joints/moveY'
import type { MoveYEventConnectionEntity } from '../../state/entities/events/connections/moveY'
import { serializeLevelDataResizeEvents } from './events/resize'
import { serializeLevelDataTransparentEvents } from './events/transparent'
import { serializeLevelDataMoveYEvents } from './events/moveY'
import { serializeLevelDataMoveXEvents } from './events/moveX'

export const serializeLevelDataEntities = (
    rectStages: RectStageObject[],

    bpms: BpmEntity[],
    timeScales: TimeScaleEntity[],

    rotateEventJoints: RotateEventJointEntity[],
    rotateEventConnections: RotateEventConnectionEntity[],

    resizeEventJoints: ResizeEventJointEntity[],
    resizeEventConnections: ResizeEventConnectionEntity[],

    transparentEventJoints: TransparentEventJointEntity[],
    transparentEventConnections: TransparentEventConnectionEntity[],

    moveXEventJoints: MoveXEventJointEntity[],
    moveXEventConnections: MoveXEventConnectionEntity[],

    moveYEventJoints: MoveYEventJointEntity[],
    moveYEventConnections: MoveYEventConnectionEntity[],

    tapNotes: TapNoteEntity[],
    holdNotes: HoldNoteEntity[],
    dragNotes: DragNoteEntity[],
    flickNotes: FlickNoteEntity[],
): LevelDataEntity[] => {
    let id = 0
    const getName = () => (id++).toString(16)

    return [
        ...serializeLevelDataBpms(bpms),
        ...serializeLevelDataRectStages(rectStages, timeScales, getName),

        ...serializeLevelDataRotateEvents(rotateEventJoints, rotateEventConnections, getName),
        ...serializeLevelDataResizeEvents(resizeEventJoints, resizeEventConnections, getName),
        ...serializeLevelDataTransparentEvents(transparentEventJoints, transparentEventConnections, getName),
        ...serializeLevelDataMoveXEvents(moveXEventJoints, moveXEventConnections, getName),
        ...serializeLevelDataMoveYEvents(moveYEventJoints, moveYEventConnections, getName),

        ...serializeLevelDataTapNotes(tapNotes),
        ...serializeLevelDataHoldNotes(holdNotes),
        ...serializeLevelDataDragNotes(dragNotes),
        ...serializeLevelDataFlickNotes(flickNotes),
    ]
}
