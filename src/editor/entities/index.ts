import LevelEditorRotateEventConnection from './events/connection/LevelEditorRotateEventConnection.vue'
import LevelEditorShiftEventConnection from './events/connection/LevelEditorShiftEventConnection.vue'
import LevelEditorZoomEventConnection from './events/connection/LevelEditorZoomEventConnection.vue'
import LevelEditorRotateEventJoint from './events/joint/LevelEditorRotateEventJoint.vue'
import LevelEditorShiftEventJoint from './events/joint/LevelEditorShiftEventJoint.vue'
import LevelEditorZoomEventJoint from './events/joint/LevelEditorZoomEventJoint.vue'
import LevelEditorDoubleHoldNoteConnection from './holdNotes/connection/LevelEditorDoubleHoldNoteConnection.vue'
import LevelEditorSingleHoldNoteConnection from './holdNotes/connection/LevelEditorSingleHoldNoteConnection.vue'
import LevelEditorDoubleHoldNoteJoint from './holdNotes/joint/LevelEditorDoubleHoldNoteJoint.vue'
import LevelEditorSingleHoldNoteJoint from './holdNotes/joint/LevelEditorSingleHoldNoteJoint.vue'
import LevelEditorTapNote from './LevelEditorTapNote.vue'
import LevelEditorBpm from './values/LevelEditorBpm.vue'
import LevelEditorTimeScale from './values/LevelEditorTimeScale.vue'

export const components = {
    bpm: LevelEditorBpm,
    timeScale: LevelEditorTimeScale,

    rotateEventJoint: LevelEditorRotateEventJoint,
    rotateEventConnection: LevelEditorRotateEventConnection,

    shiftEventJoint: LevelEditorShiftEventJoint,
    shiftEventConnection: LevelEditorShiftEventConnection,

    zoomEventJoint: LevelEditorZoomEventJoint,
    zoomEventConnection: LevelEditorZoomEventConnection,

    tapNote: LevelEditorTapNote,

    singleHoldNoteJoint: LevelEditorSingleHoldNoteJoint,
    singleHoldNoteConnection: LevelEditorSingleHoldNoteConnection,

    doubleHoldNoteJoint: LevelEditorDoubleHoldNoteJoint,
    doubleHoldNoteConnection: LevelEditorDoubleHoldNoteConnection,
}
