import { EngineArchetypeDataName } from '@sonolus/core'
import type { ValueEntity } from '../../../state/entities/values'

export const serializeLevelDataValueEntities = (
    entities: ValueEntity[],
    archetype: string,
    valueName: string,
) =>
    entities.map((entity) => ({
        archetype,
        data: [
            {
                name: EngineArchetypeDataName.Beat,
                value: entity.beat,
            },
            {
                name: valueName,
                value: entity.value,
            },
        ],
    }))
