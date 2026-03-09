import type { Store } from '..'
import type { Chart } from '../../../chart'
import { store } from '../../../history/store'
import type { StoreGrid } from '../grid'
import { createStoreJudgeMoveXEvents } from './events/judgeMoveX'
import { createStoreJudgeMoveYEvents } from './events/judgeMoveY'
import { createStoreJudgeResizeEvents } from './events/judgeResize'
import { createStoreJudgeRotateEvents } from './events/judgeRotate'
import { createStoreNoteHEvents } from './events/noteH'
import { createStoreSpawnMoveXEvents } from './events/spawnMoveX'
import { createStoreSpawnMoveYEvents } from './events/spawnMoveY'
import { createStoreSpawnResizeEvents } from './events/spawnResize'
import { createStoreSpawnRotateEvents } from './events/spawnRotate'
import { createStoreTransparentEvents } from './events/transparent'
import { createStoreSlides } from './slide'
import { createStoreBpms } from './values/bpm'
import { createStoreTimeScales } from './values/timeScale'

export const createStore = (chart: Chart): Store => {
    const store: Store = {
        grid: {
            bpm: new Map(),
            timeScale: new Map(),

            judgeRotateEventJoint: new Map(),
            judgeRotateEventConnection: new Map(),
            judgeResizeEventJoint: new Map(),
            judgeResizeEventConnection: new Map(),
            judgeMoveXEventJoint: new Map(),
            judgeMoveXEventConnection: new Map(),
            judgeMoveYEventJoint: new Map(),
            judgeMoveYEventConnection: new Map(),
            spawnRotateEventJoint: new Map(),
            spawnRotateEventConnection: new Map(),
            spawnResizeEventJoint: new Map(),
            spawnResizeEventConnection: new Map(),
            spawnMoveXEventJoint: new Map(),
            spawnMoveXEventConnection: new Map(),
            spawnMoveYEventJoint: new Map(),
            spawnMoveYEventConnection: new Map(),
            transparentEventJoint: new Map(),
            transparentEventConnection: new Map(),
            noteHEventJoint: new Map(),
            noteHEventConnection: new Map(),

            note: new Map(),
            connector: new Map(),
        },
        slides: {
            note: new Map(),
            connector: new Map(),
            info: new Map()
        },
        eventRanges: {},
        stages: []
    }

    createStoreBpms(store.grid, chart)
    createStoreTimeScales(store.grid, chart)

    const judgeRotateEventJoint = createStoreJudgeRotateEvents(store.grid, chart)
    const judgeResizeEventJoint = createStoreJudgeResizeEvents(store.grid, chart)
    const judgeMoveXEventJoint = createStoreJudgeMoveXEvents(store.grid, chart)
    const judgeMoveYEventJoint = createStoreJudgeMoveYEvents(store.grid, chart)
    const spawnRotateEventJoint = createStoreSpawnRotateEvents(store.grid, chart)
    const spawnResizeEventJoint = createStoreSpawnResizeEvents(store.grid, chart)
    const spawnMoveXEventJoint = createStoreSpawnMoveXEvents(store.grid, chart)
    const spawnMoveYEventJoint = createStoreSpawnMoveYEvents(store.grid, chart)
    const transparentEventJoint = createStoreTransparentEvents(store.grid, chart)
    const noteHEventJoint = createStoreNoteHEvents(store.grid, chart)

    createStoreSlides(store, chart)

    return {
        ...store,
        eventRanges: {
            judgeRotateEventJoint,
            judgeResizeEventJoint,
            judgeMoveXEventJoint,
            judgeMoveYEventJoint,
            spawnRotateEventJoint,
            spawnResizeEventJoint,
            spawnMoveXEventJoint,
            spawnMoveYEventJoint,
            transparentEventJoint,
            noteHEventJoint,
        },
        stages: chart.stages || [{ id: 0 }]
    }
}
