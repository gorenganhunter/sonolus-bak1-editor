import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartJudgeMoveXEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.judgeMoveXEvents, entities, 'StageJudgeMoveXEvent', valueSchema)
}
