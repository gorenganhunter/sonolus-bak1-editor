import type { Store } from '.'
import { serializeLevelDataEntities } from '../../levelDataEntities/serialize'

export const serializeStore = (store: Store) =>
    serializeLevelDataEntities(
        store.stages,

        getEntities(store.grid.bpm),
        getEntities(store.grid.timeScale),

        getEntities(store.grid.rotateEventJoint),
        getEntities(store.grid.rotateEventConnection),
        getEntities(store.grid.resizeEventJoint),
        getEntities(store.grid.resizeEventConnection),
        getEntities(store.grid.transparentEventJoint),
        getEntities(store.grid.transparentEventConnection),
        getEntities(store.grid.moveXEventJoint),
        getEntities(store.grid.moveXEventConnection),
        getEntities(store.grid.moveYEventJoint),
        getEntities(store.grid.moveYEventConnection),

        getEntities(store.grid.tapNote),
        getEntities(store.grid.holdNote),
        getEntities(store.grid.dragNote),
        getEntities(store.grid.flickNote),
    )

const getEntities = <T>(map: Map<number, Set<T>>) => {
    const entities = new Set<T>()

    for (const set of map.values()) {
        for (const entity of set) {
            entities.add(entity)
        }
    }

    return [...entities]
}
