import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartJudgeRotateEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.judgeRotateEvents, entities, 'StageJudgeRotateEvent', valueSchema)
}
