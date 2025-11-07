import type { Component } from 'vue'
import { bgm } from './bgm'
import { copy } from './copy'
import { cut } from './cut'
import { deselect } from './deselect'
import { division } from './divisions'
import { divisionCustom } from './divisions/custom'
import { eraser } from './eraser'
import { rotateEvent } from './events/rotate'
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
import { tapNote } from './tapNote'
import { undo } from './undo'
import { utilities } from './utilities'
import { bpm } from './values/bpm'
import { timeScale } from './values/timeScale'
import { bpmVisibility } from './visibilities/bpm'
import { cycleVisibilities } from './visibilities/cycle'
import { rotateEventVisibility } from './visibilities/rotateEvent'
import { tapNoteVisibility } from './visibilities/tapNote'
import { timeScaleVisibility } from './visibilities/timeScale'
import { zoomXIn } from './zoom/zoomXIn'
import { zoomXOut } from './zoom/zoomXOut'
import { zoomYIn } from './zoom/zoomYIn'
import { zoomYOut } from './zoom/zoomYOut'
import { stage } from './stage'
import { laneCustom } from './lanes/custom'
import { lane } from './lanes'
import { side } from './side'
import { flickNote } from './flickNote'
import { dragNote } from './dragNote'
import { holdNote } from './holdNote'
import { resizeEvent } from './events/resize'
import { transparentEvent } from './events/transparent'
import { moveXEvent } from './events/moveX'
import { moveYEvent } from './events/moveY'
import { resizeEventVisibility } from './visibilities/resizeEvent'
import { transparentEventVisibility } from './visibilities/transparentEvent'
import { moveXEventVisibility } from './visibilities/moveXEvent'
import { moveYEventVisibility } from './visibilities/moveYEvent'

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
    cut,
    copy,
    paste,
    undo,
    redo,

    tapNote,
    dragNote,
    flickNote,
    holdNote,

    rotateEvent,
    resizeEvent,
    transparentEvent,
    moveXEvent,
    moveYEvent,

    bpm,
    timeScale,

    scrollUp,
    scrollDown,
    scrollPageUp,
    scrollPageDown,
    jumpUp,
    jumpDown,

    cycleVisibilities,
    tapNoteVisibility,
    rotateEventVisibility,
    resizeEventVisibility,
    transparentEventVisibility,
    moveXEventVisibility,
    moveYEventVisibility,
    bpmVisibility,
    timeScaleVisibility,

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

    side0: side(0),
    side1: side(1),
    side2: side(2),
    side3: side(3),

    zoomXIn,
    zoomXOut,
    zoomYIn,
    zoomYOut,

    help,
    settings,
}

export type CommandName = keyof typeof commands

export const isCommandName = (name: string): name is CommandName => name in commands
