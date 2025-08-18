import { Type } from '@sinclair/typebox'
import { EngineArchetypeDataName, EngineArchetypeName } from '@sonolus/core'
import { parseChartStageValueObjects, parseChartValueObjects } from '.'
import { type ParseChart } from '..'

const valueSchema = Type.Number({ exclusiveMinimum: 0 })

export const parseChartTimeScales: ParseChart = (chart, entities) => {
    parseChartStageValueObjects(
        chart.timeScales,
        entities,
        "StageTimeScaleChange",
        EngineArchetypeDataName.TimeScale,
        valueSchema,
    )
}
