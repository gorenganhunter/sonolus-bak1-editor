import { EngineArchetypeDataName } from '@sonolus/core'
import { parseChartHoldNoteObjects } from '.'
import { getValue, type ParseChart } from '..'
import { beatSchema, colorSchema, laneSchema } from '../schemas'

export const parseChartDoubleHoldNotes: ParseChart = (chart, entities) => {
    parseChartHoldNoteObjects(
        chart.doubleHoldNotes,
        entities,
        'DoubleHoldNote',
        'DoubleHoldConnector',
        (entity) => ({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            color: getValue(entity, 'color', colorSchema),
            laneL: getValue(entity, 'laneL', laneSchema),
            laneR: getValue(entity, 'laneR', laneSchema),
        }),
    )
}
