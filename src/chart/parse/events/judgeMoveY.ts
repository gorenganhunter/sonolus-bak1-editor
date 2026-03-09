import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartJudgeMoveYEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.judgeMoveYEvents, entities, 'StageJudgeMoveYEvent', valueSchema)
}
