import { EngineArchetypeDataName } from '@sonolus/core'
import { getRef, getValue, type ParseChart } from '..'
import { beatSchema, durationSchema, laneSchema, sizeSchema } from '../schemas'

export const parseChartHoldNotes: ParseChart = (chart, entities) => {
    for (const entity of entities) {
        if (entity.archetype !== 'HoldNote') continue

        chart.holdNotes.push({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            lane: getValue(entity, 'lane', laneSchema),
            size: getValue(entity, 'size', sizeSchema),
            duration: getValue(entity, 'duration', durationSchema),
            stage: parseInt(getRef(entity, 'stage').replace("stage", ""))
        })
    }
}
