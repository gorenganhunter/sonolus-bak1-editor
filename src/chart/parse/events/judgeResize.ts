import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartJudgeResizeEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.judgeResizeEvents, entities, 'StageJudgeResizeEvent', valueSchema)
}
