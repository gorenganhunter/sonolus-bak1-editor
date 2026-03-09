import LevelEditorJudgeRotateEventConnection from './events/connection/LevelEditorJudgeRotateEventConnection.vue'
import LevelEditorJudgeRotateEventJoint from './events/joint/LevelEditorJudgeRotateEventJoint.vue'
import LevelEditorJudgeResizeEventConnection from './events/connection/LevelEditorJudgeResizeEventConnection.vue'
import LevelEditorJudgeResizeEventJoint from './events/joint/LevelEditorJudgeResizeEventJoint.vue'
import LevelEditorJudgeMoveXEventConnection from './events/connection/LevelEditorJudgeMoveXEventConnection.vue'
import LevelEditorJudgeMoveXEventJoint from './events/joint/LevelEditorJudgeMoveXEventJoint.vue'
import LevelEditorJudgeMoveYEventConnection from './events/connection/LevelEditorJudgeMoveYEventConnection.vue'
import LevelEditorJudgeMoveYEventJoint from './events/joint/LevelEditorJudgeMoveYEventJoint.vue'
import LevelEditorSpawnRotateEventConnection from './events/connection/LevelEditorSpawnRotateEventConnection.vue'
import LevelEditorSpawnRotateEventJoint from './events/joint/LevelEditorSpawnRotateEventJoint.vue'
import LevelEditorSpawnResizeEventConnection from './events/connection/LevelEditorSpawnResizeEventConnection.vue'
import LevelEditorSpawnResizeEventJoint from './events/joint/LevelEditorSpawnResizeEventJoint.vue'
import LevelEditorSpawnMoveXEventConnection from './events/connection/LevelEditorSpawnMoveXEventConnection.vue'
import LevelEditorSpawnMoveXEventJoint from './events/joint/LevelEditorSpawnMoveXEventJoint.vue'
import LevelEditorSpawnMoveYEventConnection from './events/connection/LevelEditorSpawnMoveYEventConnection.vue'
import LevelEditorSpawnMoveYEventJoint from './events/joint/LevelEditorSpawnMoveYEventJoint.vue'
import LevelEditorTransparentEventConnection from './events/connection/LevelEditorTransparentEventConnection.vue'
import LevelEditorTransparentEventJoint from './events/joint/LevelEditorTransparentEventJoint.vue'
import LevelEditorNoteHEventConnection from './events/connection/LevelEditorNoteHEventConnection.vue'
import LevelEditorNoteHEventJoint from './events/joint/LevelEditorNoteHEventJoint.vue'
import LevelEditorNote from './notes/LevelEditorNote.vue'
import LevelEditorConnector from './connector/LevelEditorConnector.vue'
import LevelEditorBpm from './values/LevelEditorBpm.vue'
import LevelEditorTimeScale from './values/LevelEditorTimeScale.vue'
import { state } from '../../history'

export const components = {
    bpm: LevelEditorBpm,
    timeScale: LevelEditorTimeScale,

    judgeRotateEventJoint: LevelEditorJudgeRotateEventJoint,
    judgeRotateEventConnection: LevelEditorJudgeRotateEventConnection,
    judgeResizeEventJoint: LevelEditorJudgeResizeEventJoint,
    judgeResizeEventConnection: LevelEditorJudgeResizeEventConnection,
    judgeMoveXEventJoint: LevelEditorJudgeMoveXEventJoint,
    judgeMoveXEventConnection: LevelEditorJudgeMoveXEventConnection,
    judgeMoveYEventJoint: LevelEditorJudgeMoveYEventJoint,
    judgeMoveYEventConnection: LevelEditorJudgeMoveYEventConnection,
    spawnRotateEventJoint: LevelEditorSpawnRotateEventJoint,
    spawnRotateEventConnection: LevelEditorSpawnRotateEventConnection,
    spawnResizeEventJoint: LevelEditorSpawnResizeEventJoint,
    spawnResizeEventConnection: LevelEditorSpawnResizeEventConnection,
    spawnMoveXEventJoint: LevelEditorSpawnMoveXEventJoint,
    spawnMoveXEventConnection: LevelEditorSpawnMoveXEventConnection,
    spawnMoveYEventJoint: LevelEditorSpawnMoveYEventJoint,
    spawnMoveYEventConnection: LevelEditorSpawnMoveYEventConnection,
    transparentEventJoint: LevelEditorTransparentEventJoint,
    transparentEventConnection: LevelEditorTransparentEventConnection,
    noteHEventJoint: LevelEditorNoteHEventJoint,
    noteHEventConnection: LevelEditorNoteHEventConnection,

    note: LevelEditorNote,
    connector: LevelEditorConnector
}
