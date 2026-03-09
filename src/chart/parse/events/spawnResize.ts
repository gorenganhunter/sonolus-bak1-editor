import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartSpawnResizeEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.spawnResizeEvents, entities, 'StageSpawnResizeEvent', valueSchema)
}
