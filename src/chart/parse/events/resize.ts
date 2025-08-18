import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartResizeEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.resizeEvents, entities, 'StageResizeEvent', valueSchema)
}
