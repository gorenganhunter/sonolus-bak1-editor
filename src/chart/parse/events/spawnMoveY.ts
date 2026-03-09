import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartSpawnMoveYEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.spawnMoveYEvents, entities, 'StageSpawnMoveYEvent', valueSchema)
}
