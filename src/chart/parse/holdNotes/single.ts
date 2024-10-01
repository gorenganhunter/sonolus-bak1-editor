import { EngineArchetypeDataName } from '@sonolus/core'
import { parseChartHoldNoteObjects } from '.'
import { getValue, type ParseChart } from '..'
import { beatSchema, colorSchema, laneSchema, scaleSchema } from '../schemas'

export const parseChartSingleHoldNotes: ParseChart = (chart, entities) => {
    parseChartHoldNoteObjects(
        chart.singleHoldNotes,
        entities,
        'SingleHoldNote',
        'SingleHoldConnector',
        (entity) => ({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            color: getValue(entity, 'color', colorSchema),
            lane: getValue(entity, 'lane', laneSchema),
            scaleL: getValue(entity, 'scaleL', scaleSchema),
            scaleR: getValue(entity, 'scaleR', scaleSchema),
        }),
    )
}
