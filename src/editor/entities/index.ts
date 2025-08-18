import LevelEditorRotateEventConnection from './events/connection/LevelEditorRotateEventConnection.vue'
import LevelEditorRotateEventJoint from './events/joint/LevelEditorRotateEventJoint.vue'
import LevelEditorResizeEventConnection from './events/connection/LevelEditorResizeEventConnection.vue'
import LevelEditorResizeEventJoint from './events/joint/LevelEditorResizeEventJoint.vue'
import LevelEditorTransparentEventConnection from './events/connection/LevelEditorTransparentEventConnection.vue'
import LevelEditorTransparentEventJoint from './events/joint/LevelEditorTransparentEventJoint.vue'
import LevelEditorMoveXEventConnection from './events/connection/LevelEditorMoveXEventConnection.vue'
import LevelEditorMoveXEventJoint from './events/joint/LevelEditorMoveXEventJoint.vue'
import LevelEditorMoveYEventConnection from './events/connection/LevelEditorMoveYEventConnection.vue'
import LevelEditorMoveYEventJoint from './events/joint/LevelEditorMoveYEventJoint.vue'
import LevelEditorTapNote from './notes/LevelEditorTapNote.vue'
import LevelEditorDragNote from './notes/LevelEditorDragNote.vue'
import LevelEditorFlickNote from './notes/LevelEditorFlickNote.vue'
import LevelEditorHoldNote from './notes/LevelEditorHoldNote.vue'
import LevelEditorHoldConnector from './notes/LevelEditorHoldConnector.vue'
import LevelEditorBpm from './values/LevelEditorBpm.vue'
import LevelEditorTimeScale from './values/LevelEditorTimeScale.vue'
import { state } from '../../history'

export const components = {
    bpm: LevelEditorBpm,
    timeScale: LevelEditorTimeScale,

    rotateEventJoint: LevelEditorRotateEventJoint,
    rotateEventConnection: LevelEditorRotateEventConnection,
    resizeEventJoint: LevelEditorResizeEventJoint,
    resizeEventConnection: LevelEditorResizeEventConnection,
    transparentEventJoint: LevelEditorTransparentEventJoint,
    transparentEventConnection: LevelEditorTransparentEventConnection,
    moveXEventJoint: LevelEditorMoveXEventJoint,
    moveXEventConnection: LevelEditorMoveXEventConnection,
    moveYEventJoint: LevelEditorMoveYEventJoint,
    moveYEventConnection: LevelEditorMoveYEventConnection,

    tapNote: LevelEditorTapNote,
    dragNote: LevelEditorDragNote,
    flickNote: LevelEditorFlickNote,
    holdNote: LevelEditorHoldNote,
    holdConnector: LevelEditorHoldConnector
}
