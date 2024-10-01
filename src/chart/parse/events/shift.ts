import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'
import { scaleSchema } from '../schemas'

export const parseChartShiftEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.shiftEvents, entities, 'ShiftEvent', scaleSchema)
}
