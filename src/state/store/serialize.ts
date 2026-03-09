import type { Store } from '.'
import { serializeLevelDataEntities } from '../../levelDataEntities/serialize'

export const serializeStore = (store: Store) =>
    serializeLevelDataEntities(store)

const getEntities = <T>(map: Map<number, Set<T>>) => {
    const entities = new Set<T>()

    for (const set of map.values()) {
        for (const entity of set) {
            entities.add(entity)
        }
    }

    return [...entities]
}
