import { EngineArchetypeDataName } from '@sonolus/core'
import { getRef, getValue, type ParseChart } from '..'
import { beatSchema, laneSchema, sizeSchema } from '../schemas'

export const parseChartFlickNotes: ParseChart = (chart, entities) => {
    for (const entity of entities) {
        if (entity.archetype !== 'FlickNote') continue

        chart.flickNotes.push({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            lane: getValue(entity, 'lane', laneSchema),
            size: getValue(entity, 'size', sizeSchema),
            stage: parseInt(getRef(entity, 'stage').replace("stage", ""))
        })
    }
}
