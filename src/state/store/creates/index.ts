import type { Store } from '..'
import type { Chart } from '../../../chart'
import type { StoreGrid } from '../grid'
import { createStoreMoveXEvents } from './events/moveX'
import { createStoreMoveYEvents } from './events/moveY'
import { createStoreResizeEvents } from './events/resize'
import { createStoreRotateEvents } from './events/rotate'
import { createStoreTransparentEvents } from './events/transparent'
import { createStoreDragNotes } from './notes/dragNote'
import { createStoreFlickNotes } from './notes/flickNote'
import { createStoreHoldNotes } from './notes/holdNote'
import { createStoreTapNotes } from './notes/tapNote'
import { createStoreBpms } from './values/bpm'
import { createStoreTimeScales } from './values/timeScale'

export const createStore = (chart: Chart): Store => {
    const grid: StoreGrid = {
        bpm: new Map(),
        timeScale: new Map(),

        rotateEventJoint: new Map(),
        rotateEventConnection: new Map(),
        resizeEventJoint: new Map(),
        resizeEventConnection: new Map(),
        transparentEventJoint: new Map(),
        transparentEventConnection: new Map(),
        moveXEventJoint: new Map(),
        moveXEventConnection: new Map(),
        moveYEventJoint: new Map(),
        moveYEventConnection: new Map(),

        tapNote: new Map(),
        dragNote: new Map(),
        flickNote: new Map(),
        holdNote: new Map()
    }

    createStoreBpms(grid, chart)
    createStoreTimeScales(grid, chart)

    const rotateEventJoint = createStoreRotateEvents(grid, chart)
    const resizeEventJoint = createStoreResizeEvents(grid, chart)
    const transparentEventJoint = createStoreTransparentEvents(grid, chart)
    const moveXEventJoint = createStoreMoveXEvents(grid, chart)
    const moveYEventJoint = createStoreMoveYEvents(grid, chart)

    createStoreTapNotes(grid, chart)
    createStoreDragNotes(grid, chart)
    createStoreFlickNotes(grid, chart)
    createStoreHoldNotes(grid, chart)

    return {
        grid,
        eventRanges: {
            rotateEventJoint,
            resizeEventJoint,
            transparentEventJoint,
            moveXEventJoint,
            moveYEventJoint
        },
        stages: chart.rectStages || [{ id: 0 }]
    }
}
