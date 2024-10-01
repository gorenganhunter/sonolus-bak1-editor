import { parseChartEventObjects } from '.'
import type { ParseChart } from '..'
import { scaleSchema } from '../schemas'

export const parseChartZoomEvents: ParseChart = (chart, entities) => {
    parseChartEventObjects(chart.zoomEvents, entities, 'ZoomEvent', scaleSchema)
}
