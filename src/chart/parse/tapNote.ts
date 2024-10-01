import { EngineArchetypeDataName } from '@sonolus/core'
import { getValue, type ParseChart } from '.'
import { beatSchema, colorSchema, laneSchema } from './schemas'

export const parseChartTapNotes: ParseChart = (chart, entities) => {
    for (const entity of entities) {
        if (entity.archetype !== 'TapNote') continue

        chart.tapNotes.push({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            color: getValue(entity, 'color', colorSchema),
            lane: getValue(entity, 'lane', laneSchema),
        })
    }
}
