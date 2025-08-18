import type { EventObject } from '../../../../chart'
import type { EntityOfType } from '../../../entities'
import type { EventConnectionEntityType } from '../../../entities/events/connections'
import type { EventJointEntityType } from '../../../entities/events/joints'
import { addToStoreGrid, type StoreGrid } from '../../grid'

export const createStoreEventEntities = <
    T extends EventJointEntityType,
    U extends EventConnectionEntityType,
>(
    grid: StoreGrid,
    objects: EventObject[],
    toJointEntity: (object: EventObject) => EntityOfType<T>,
    toConnectionEntity: (min: EntityOfType<T>, max: EntityOfType<T>) => EntityOfType<U>,
) => {
    let stages: any[] = []

    objects.forEach(o => {
        if (!stages.includes(o.stage)) stages.push(o.stage)
    })

    stages = stages.map(s => objects.filter(o => o.stage === s))
    //    console.log(stages)
    for (let objects2 of stages) {
        let min: EntityOfType<T> | undefined
        let max: EntityOfType<T> | undefined
        let prev: EntityOfType<T> | undefined

        for (const object of [...objects2].sort((a, b) => a.beat - b.beat)) {
            const entity = toJointEntity(object)

            if (prev) addToStoreGrid(grid, toConnectionEntity(prev, entity), prev.beat, entity.beat)

            addToStoreGrid(grid, entity, entity.beat)

            min ??= entity
            max = entity
            prev = entity
        }
        //
        // if (min && max)
        //     return {
        //         min,
        //         max,
        //     }
    }
}
