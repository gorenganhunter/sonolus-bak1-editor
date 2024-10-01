import type { ValueObject } from '../../../chart'
import { addToOrdered, removeFromOrdered } from '../../../utils/ordered'
import type { EntityOfType } from '../../entities'
import type { ValueEntityType } from '../../entities/values'
import type { Integral } from '../../integrals'
import type { Store } from '../../store'
import { addToStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addValue = <T extends Integral, U extends ValueEntityType>(
    store: Store,
    integrals: T[],
    object: ValueObject,
    toIntegral: (object: ValueObject) => T,
    toEntity: (object: ValueObject) => EntityOfType<U>,
) => {
    addToOrdered(integrals, 'x', toIntegral(object))

    const entity = toEntity(object)
    addToStoreGrid(store.grid, entity, entity.beat)

    return [entity]
}

export const removeValue = <T extends ValueEntityType>(
    store: Store,
    integrals: Integral[],
    entity: EntityOfType<T>,
) => {
    removeFromOrdered(integrals, 'x', entity.beat)

    removeFromStoreGrid(store.grid, entity, entity.beat)
}
