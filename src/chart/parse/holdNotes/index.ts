import { type LevelDataEntity } from '@sonolus/core'
import { getRef } from '..'
import type { HoldNoteJointObject } from '../..'

export const parseChartHoldNoteObjects = <T extends HoldNoteJointObject>(
    objects: T[][],
    entities: LevelDataEntity[],
    noteArchetype: string,
    connectionArchetype: string,
    toObject: (entity: LevelDataEntity) => T,
) => {
    const groups = new Map<string, LevelDataEntity[]>()

    for (const entity of entities) {
        if (entity.archetype !== noteArchetype) continue

        if (entity.name === undefined) {
            objects.push([toObject(entity)])
        } else {
            groups.set(entity.name, [entity])
        }
    }

    for (const entity of entities) {
        if (entity.archetype !== connectionArchetype) continue

        const head = groups.get(getRef(entity, 'head'))
        if (!head) throw new Error('Invalid level: head not found')

        const tail = groups.get(getRef(entity, 'tail'))
        if (!tail) throw new Error('Invalid level: tail not found')

        head.push(...tail)

        for (const entity of tail) {
            if (entity.name === undefined) throw new Error('Unexpected missing name')

            groups.set(entity.name, head)
        }
    }

    for (const group of new Set(groups.values())) {
        objects.push(group.map(toObject))
    }
}
