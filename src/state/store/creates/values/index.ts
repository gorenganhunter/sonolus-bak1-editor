import type { ValueObject } from '../../../../chart'
import type { EntityOfType } from '../../../entities'
import type { ValueEntityType } from '../../../entities/values'
import { addToStoreGrid, type StoreGrid } from '../../grid'

export const createStoreValueEntities = <T extends ValueEntityType>(
    grid: StoreGrid,
    objects: ValueObject[],
    toEntity: (object: ValueObject) => EntityOfType<T>,
) => {
    for (const object of objects) {
        const entity = toEntity(object)

        addToStoreGrid(grid, entity, entity.beat)
    }
}
