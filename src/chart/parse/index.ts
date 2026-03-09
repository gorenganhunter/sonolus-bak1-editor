import { type Static, type TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { type LevelDataEntity } from '@sonolus/core'
import type { Chart } from '..'
import { parseChartBpms } from './values/bpm'
import { parseChartTimeScales } from './values/timeScale'
import { parseChartJudgeRotateEvents } from './events/judgeRotate'
import { parseChartJudgeResizeEvents } from './events/judgeResize'
import { parseChartJudgeMoveXEvents } from './events/judgeMoveX'
import { parseChartJudgeMoveYEvents } from './events/judgeMoveY'
import { parseChartSpawnRotateEvents } from './events/spawnRotate'
import { parseChartSpawnResizeEvents } from './events/spawnResize'
import { parseChartSpawnMoveXEvents } from './events/spawnMoveX'
import { parseChartSpawnMoveYEvents } from './events/spawnMoveY'
import { parseChartTransparentEvents } from './events/transparent'
import { parseChartStages } from './stage'
import { parseChartSlides } from './slide'
import { parseChartNoteHEvents } from './events/noteH'

export type ParseChart = (chart: Chart, entities: LevelDataEntity[]) => void

export const parseChart = (entities: LevelDataEntity[]): Chart => {
    const chart: Chart = {
        bpms: [],
        timeScales: [],

        stages: [],

        slides: [],

        judgeMoveXEvents: [],
        judgeMoveYEvents: [],
        judgeResizeEvents: [],
        judgeRotateEvents: [],
        spawnMoveXEvents: [],
        spawnMoveYEvents: [],
        spawnResizeEvents: [],
        spawnRotateEvents: [],
        transparentEvents: [],
        noteHEvents: [],
    }

    parseChartStages(chart, entities)

    parseChartBpms(chart, entities)
    parseChartTimeScales(chart, entities)

    parseChartJudgeMoveXEvents(chart, entities)
    parseChartJudgeMoveYEvents(chart, entities)
    parseChartJudgeRotateEvents(chart, entities)
    parseChartJudgeResizeEvents(chart, entities)
    parseChartSpawnMoveXEvents(chart, entities)
    parseChartSpawnMoveYEvents(chart, entities)
    parseChartSpawnRotateEvents(chart, entities)
    parseChartSpawnResizeEvents(chart, entities)
    parseChartTransparentEvents(chart, entities)
    parseChartNoteHEvents(chart, entities)

    parseChartSlides(chart, entities)
    //console.log(chart)
    // parseChartTapNotes(chart, entities)
    // parseChartHoldNotes(chart, entities)
    // parseChartDragNotes(chart, entities)
    // parseChartFlickNotes(chart, entities)

    return chart
}

export const getValue = <T extends TSchema>(
    entity: LevelDataEntity,
    name: string,
    schema: T,
): Static<T> => {
    const data = entity.data.find((data) => data.name === name)
    if (!data) throw new Error(`Invalid level: data ${name} not found`)
    if (!('value' in data)) throw new Error(`Invalid level: data ${name} has no value`)

    Value.Assert(schema, data.value)
    return data.value
}

export const getOptionalValue = <T extends TSchema>(
    entity: LevelDataEntity,
    name: string,
    schema: T,
): Static<T> | undefined => {
    const data = entity.data.find((data) => data.name === name)
    if (!data) return
    if (!('value' in data)) return

    Value.Assert(schema, data.value)
    return data.value
}

export const getRef = (entity: LevelDataEntity, name: string) => {
    const data = entity.data.find((data) => data.name === name)
    if (!data) throw new Error(`Invalid level: data ${name} not found`)
    if (!('ref' in data)) throw new Error(`Invalid level: data ${name} has no ref`)

    return data.ref
}

export const getOptionalRef = (entity: LevelDataEntity, name: string) => {
    const data = entity.data.find((data) => data.name === name)
    if (!data) return
    if (!('ref' in data)) return

    return data.ref
}

// export const getGroup = (chart: Chart, timeScaleNames: TimeScaleNames, entity: LevelDataEntity) => {
//     const group = getRef(entity, 'group')
//     const index = timeScaleNames.indexOf(group)
//     if (index === -1) throw new Error(`Invalid level: ref "${group}" not found`)
//
//     chart.groupCount = Math.max(chart.groupCount, index + 2)
//     return index
// }
