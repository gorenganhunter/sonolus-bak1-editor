import { Type, type TNumber } from '@sinclair/typebox'
import { EngineArchetypeDataName, type LevelDataEntity } from '@sonolus/core'
import { getRef, getValue } from '..'
import { EaseType, type EventObject } from '../..'
import { beatSchema } from '../schemas'

const easeSchema = Type.Enum(EaseType)

export const parseChartEventObjects = (
    objects: EventObject[],
    entities: LevelDataEntity[],
    archetype: string,
    schema: TNumber,
) => {
    for (const entity of entities) {
        if (entity.archetype !== archetype) continue

        objects.push({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            value: getValue(entity, 'value', schema),
            ease: getValue(entity, 'ease', easeSchema),
            stage: parseInt(getRef(entity, 'stage').replace("stage", ""))
        })
    }
}
