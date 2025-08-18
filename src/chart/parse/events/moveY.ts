import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartMoveYEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.moveYEvents, entities, 'StageMoveYEvent', valueSchema)
}
