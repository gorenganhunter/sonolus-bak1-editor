import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartTransparentEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.transparentEvents, entities, 'StageTransparentEvent', valueSchema)
}
