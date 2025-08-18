import { EngineArchetypeDataName, type LevelDataEntity } from '@sonolus/core'
import type { EventConnectionEntity } from '../../../state/entities/events/connections'
import type { EventJointEntity } from '../../../state/entities/events/joints'

export const serializeLevelDataEventEntities = (
    joints: EventJointEntity[],
    connections: EventConnectionEntity[],
    getName: () => string,
    archetype: string,
) => {
    const map = new Map<object, LevelDataEntity>()

    for (const joint of joints) {
        map.set(joint, {
            archetype,
            data: [
                {
                    name: EngineArchetypeDataName.Beat,
                    value: joint.beat,
                },
                {
                    name: 'value',
                    value: joint.value,
                },
                {
                    name: 'ease',
                    value: joint.ease,
                },
                {
                    name: 'stage',
                    ref: `stage${joint.stage}`
                }
            ],
        })
    }

    for (const connection of connections) {
        const min = map.get(connection.min)
        if (!min) throw new Error('Unexpected min not found')

        const max = map.get(connection.max)
        if (!max) throw new Error('Unexpected max not found')

        min.data.push({
            name: 'next',
            ref: (max.name ??= getName()),
        })
    }

    return map.values()
}
