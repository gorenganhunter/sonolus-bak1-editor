import type { Component } from 'vue'
import { bgm } from './bgm'
import { copy } from './copy'
import { cut } from './cut'
import { deselect } from './deselect'
import { division } from './divisions'
import { divisionCustom } from './divisions/custom'
import { eraser } from './eraser'
import { flip } from './flip'
import { help } from './help'
import { jumpDown } from './jumpDown'
import { jumpUp } from './jumpUp'
import { open } from './open'
import { paste } from './paste'
import { play } from './play'
import { redo } from './redo'
import { reset } from './reset'
import { save } from './save'
import { scrollDown } from './scrollDown'
import { scrollPageDown } from './scrollPageDown'
import { scrollPageUp } from './scrollPageUp'
import { scrollUp } from './scrollUp'
import { select } from './select'
import { settings } from './settings'
import { snapping } from './snapping'
import { speedDown } from './speedDown'
import { speedUp } from './speedUp'
import { stop } from './stop'
import { undo } from './undo'
import { utilities } from './utilities'
import { bpm } from './values/bpm'
import { timeScale } from './values/timeScale'
import { bpmVisibility } from './visibilities/bpm'
import { cycleVisibilities } from './visibilities/cycle'
import { timeScaleVisibility } from './visibilities/timeScale'
import { zoomXIn } from './zoom/zoomXIn'
import { zoomXOut } from './zoom/zoomXOut'
import { zoomYIn } from './zoom/zoomYIn'
import { zoomYOut } from './zoom/zoomYOut'
import { stage } from './stage'
import { laneCustom } from './lanes/custom'
import { lane } from './lanes'
import { createNote, note } from './note'
import { createSlide, slide } from './slide'
import { judgeResizeEvent } from './events/judgeResize'
import { judgeRotateEvent } from './events/judgeRotate'
import { judgeMoveXEvent } from './events/judgeMoveX'
import { judgeMoveYEvent } from './events/judgeMoveY'
import { spawnResizeEvent } from './events/spawnResize'
import { spawnRotateEvent } from './events/spawnRotate'
import { spawnMoveXEvent } from './events/spawnMoveX'
import { spawnMoveYEvent } from './events/spawnMoveY'
import { transparentEvent } from './events/transparent'
import { noteHEvent } from './events/noteH'
import { judgeResizeEventVisibility } from './visibilities/judgeResizeEvent'
import { judgeRotateEventVisibility } from './visibilities/judgeRotateEvent'
import { judgeMoveXEventVisibility } from './visibilities/judgeMoveXEvent'
import { judgeMoveYEventVisibility } from './visibilities/judgeMoveYEvent'
import { spawnResizeEventVisibility } from './visibilities/spawnResizeEvent'
import { spawnRotateEventVisibility } from './visibilities/spawnRotateEvent'
import { spawnMoveXEventVisibility } from './visibilities/spawnMoveXEvent'
import { spawnMoveYEventVisibility } from './visibilities/spawnMoveYEvent'
import { transparentEventVisibility } from './visibilities/transparentEvent'
import { noteHEventVisibility } from './visibilities/noteHEvent'
import { fullscreen } from './fullscreen'
import { noteVisibility } from './visibilities/note'
import { brush } from './brush'

export type Command = {
    title: () => string
    icon: {
        is: Component
        props?: object
    }

    execute: () => void | Promise<void>
}

export const commands = {
    open,
    save,
    reset,
    utilities,

    play,
    stop,
    speedUp,
    speedDown,
    bgm,

    stage,

    select,
    deselect,
    eraser,
    flip,
    brush,
    cut,
    copy,
    paste,
    undo,
    redo,

    // tapNote,
    // dragNote,
    // flickNote,
    // holdNote,

    note,
    note0: createNote(0),
    note1: createNote(1),
    note2: createNote(2),
    note3: createNote(3),

    slide,
    slide0: createSlide(0),

    judgeRotateEvent,
    judgeResizeEvent,
    judgeMoveXEvent,
    judgeMoveYEvent,
    spawnRotateEvent,
    spawnResizeEvent,
    spawnMoveXEvent,
    spawnMoveYEvent,
    transparentEvent,
    noteHEvent,

    bpm,
    timeScale,

    scrollUp,
    scrollDown,
    scrollPageUp,
    scrollPageDown,
    jumpUp,
    jumpDown,

    cycleVisibilities,
    judgeRotateEventVisibility,
    judgeResizeEventVisibility,
    judgeMoveXEventVisibility,
    judgeMoveYEventVisibility,
    spawnRotateEventVisibility,
    spawnResizeEventVisibility,
    spawnMoveXEventVisibility,
    spawnMoveYEventVisibility,
    transparentEventVisibility,
    noteHEventVisibility,
    bpmVisibility,
    timeScaleVisibility,
    noteVisibility,

    division1: division(1),
    division2: division(2),
    division3: division(3),
    division4: division(4),
    division6: division(6),
    division8: division(8),
    division12: division(12),
    division16: division(16),
    divisionCustom,
    snapping,

    lane1: lane(1),
    lane2: lane(2),
    lane3: lane(3),
    lane4: lane(4),
    lane6: lane(6),
    lane8: lane(8),
    lane12: lane(12),
    lane16: lane(16),
    laneCustom,

    zoomXIn,
    zoomXOut,
    zoomYIn,
    zoomYOut,

    fullscreen,
    help,
    settings,
}

export type CommandName = keyof typeof commands

export const isCommandName = (name: string): name is CommandName => name in commands
