import { Type } from '@sinclair/typebox'
import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'

const valueSchema = Type.Number()

export const parseChartNoteHEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.noteHEvents, entities, 'StageNoteHEvent', valueSchema)
}
