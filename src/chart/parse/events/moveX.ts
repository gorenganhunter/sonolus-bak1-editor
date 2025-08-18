import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartMoveXEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.moveXEvents, entities, 'StageMoveXEvent', valueSchema)
}
