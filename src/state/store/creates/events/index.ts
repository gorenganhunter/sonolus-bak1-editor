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
    let min: EntityOfType<T> | undefined
    let max: EntityOfType<T> | undefined
    let prev: EntityOfType<T> | undefined

    for (const object of [...objects].sort((a, b) => a.beat - b.beat)) {
        const entity = toJointEntity(object)

        if (prev) addToStoreGrid(grid, toConnectionEntity(prev, entity), prev.beat, entity.beat)

        addToStoreGrid(grid, entity, entity.beat)

        min ??= entity
        max = entity
        prev = entity
    }

    if (min && max)
        return {
            min,
            max,
        }
}
