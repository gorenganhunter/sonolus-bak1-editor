import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartSpawnRotateEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.spawnRotateEvents, entities, 'StageSpawnRotateEvent', valueSchema)
}
