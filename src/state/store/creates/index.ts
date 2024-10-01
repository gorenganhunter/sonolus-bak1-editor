import type { Store } from '..'
import type { Chart } from '../../../chart'
import type { StoreGrid } from '../grid'
import type { HoldNoteRanges } from '../holdNoteRanges'
import { createStoreRotateEvents } from './events/rotate'
import { createStoreShiftEvents } from './events/shift'
import { createStoreZoomEvents } from './events/zoom'
import { createStoreDoubleHoldNotes } from './holdNotes/double'
import { createStoreSingleHoldNotes } from './holdNotes/single'
import { createStoreTapNotes } from './tapNote'
import { createStoreBpms } from './values/bpm'
import { createStoreTimeScales } from './values/timeScale'

export const createStore = (chart: Chart): Store => {
    const grid: StoreGrid = {
        bpm: new Map(),
        timeScale: new Map(),

        rotateEventJoint: new Map(),
        rotateEventConnection: new Map(),
        shiftEventJoint: new Map(),
        shiftEventConnection: new Map(),
        zoomEventJoint: new Map(),
        zoomEventConnection: new Map(),

        tapNote: new Map(),

        singleHoldNoteJoint: new Map(),
        singleHoldNoteConnection: new Map(),
        doubleHoldNoteJoint: new Map(),
        doubleHoldNoteConnection: new Map(),
    }

    const holdNoteRanges: HoldNoteRanges = {
        singleHoldNoteJoint: new Map(),
        doubleHoldNoteJoint: new Map(),
    }

    createStoreBpms(grid, chart)
    createStoreTimeScales(grid, chart)

    const rotateEventJoint = createStoreRotateEvents(grid, chart)
    const shiftEventJoint = createStoreShiftEvents(grid, chart)
    const zoomEventJoint = createStoreZoomEvents(grid, chart)

    createStoreTapNotes(grid, chart)

    createStoreSingleHoldNotes(grid, holdNoteRanges, chart)
    createStoreDoubleHoldNotes(grid, holdNoteRanges, chart)

    return {
        grid,
        eventRanges: {
            rotateEventJoint,
            shiftEventJoint,
            zoomEventJoint,
        },
        holdNoteRanges,
    }
}
