import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartSpawnMoveXEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.spawnMoveXEvents, entities, 'StageSpawnMoveXEvent', valueSchema)
}
