import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartRotateEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.rotateEvents, entities, 'StageRotateEvent', valueSchema)
}
