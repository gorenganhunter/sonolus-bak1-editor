import { type TNumber } from '@sinclair/typebox'
import { EngineArchetypeDataName, type LevelDataEntity } from '@sonolus/core'
import { getRef, getValue } from '..'
import type { StageValueObject, ValueObject } from '../..'
import { beatSchema } from '../schemas'

export const parseChartValueObjects = (
    objects: ValueObject[],
    entities: LevelDataEntity[],
    archetype: string,
    dataName: string,
    schema: TNumber,
) => {
    for (const entity of entities) {
        if (entity.archetype !== archetype) continue

        objects.push({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            value: getValue(entity, dataName, schema),
        })
    }
}

export const parseChartStageValueObjects = (
    objects: StageValueObject[],
    entities: LevelDataEntity[],
    archetype: string,
    dataName: string,
    schema: TNumber,
) => {
    for (const entity of entities) {
        if (entity.archetype !== archetype) continue

        objects.push({
            beat: getValue(entity, EngineArchetypeDataName.Beat, beatSchema),
            value: getValue(entity, dataName, schema),
            stage: parseInt(getRef(entity, 'stage').replace("stage", ""))
        })
    }
}
