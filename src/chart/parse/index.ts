import { type Static, type TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { type LevelDataEntity } from '@sonolus/core'
import type { Chart } from '..'
import { parseChartRotateEvents } from './events/rotate'
import { parseChartTapNotes } from './notes/tapNote'
import { parseChartBpms } from './values/bpm'
import { parseChartTimeScales } from './values/timeScale'
import { parseChartResizeEvents } from './events/resize'
import { parseChartMoveXEvents } from './events/moveX'
import { parseChartMoveYEvents } from './events/moveY'
import { parseChartTransparentEvents } from './events/transparent'
import { parseChartHoldNotes } from './notes/holdNote'
import { parseChartFlickNotes } from './notes/flickNote'
import { parseChartDragNotes } from './notes/dragNote'

export type ParseChart = (chart: Chart, entities: LevelDataEntity[]) => void

export const parseChart = (entities: LevelDataEntity[]): Chart => {
    const chart: Chart = {
        bpms: [],
        timeScales: [],

        rectStages: [],

        tapNotes: [],
        holdNotes: [],
        dragNotes: [],
        flickNotes: [],

        moveXEvents: [],
        moveYEvents: [],
        resizeEvents: [],
        rotateEvents: [],
        transparentEvents: []
    }

    chart.rectStages = entities.filter(({ archetype }) => archetype === "RectStage").map(({ name }) => ({ id: parseInt(name!.replace("stage", "")) }))

    parseChartBpms(chart, entities)
    parseChartTimeScales(chart, entities)

    parseChartMoveXEvents(chart, entities)
    parseChartMoveYEvents(chart, entities)
    parseChartRotateEvents(chart, entities)
    parseChartResizeEvents(chart, entities)
    parseChartTransparentEvents(chart, entities)

    parseChartTapNotes(chart, entities)
    parseChartHoldNotes(chart, entities)
    parseChartDragNotes(chart, entities)
    parseChartFlickNotes(chart, entities)

    return chart
}

export const getValue = <T extends TSchema>(
    entity: LevelDataEntity,
    name: string,
    schema: T,
): Static<T> => {
    const data = entity.data.find((data) => data.name === name)
    if (!data) throw new Error(`Invalid level: ${name} not found`)
    if (!('value' in data)) throw new Error(`Invalid level: ${name} has no value`)

    Value.Assert(schema, data.value)
    return data.value
}

export const getRef = (entity: LevelDataEntity, name: string) => {
    const data = entity.data.find((data) => data.name === name)
    if (!data) throw new Error(`Invalid level: ${name} not found`)
    if (!('ref' in data)) throw new Error(`Invalid level: ${name} has no ref`)

    return data.ref
}
