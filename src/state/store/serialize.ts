import type { Store } from '.'
import { serializeLevelDataEntities } from '../../levelDataEntities/serialize'

export const serializeStore = (store: Store) =>
    serializeLevelDataEntities(
        getEntities(store.grid.bpm),
        getEntities(store.grid.timeScale),

        getEntities(store.grid.rotateEventJoint),
        getEntities(store.grid.rotateEventConnection),
        getEntities(store.grid.shiftEventJoint),
        getEntities(store.grid.shiftEventConnection),
        getEntities(store.grid.zoomEventJoint),
        getEntities(store.grid.zoomEventConnection),

        getEntities(store.grid.tapNote),

        getEntities(store.grid.singleHoldNoteJoint),
        getEntities(store.grid.singleHoldNoteConnection),
        getEntities(store.grid.doubleHoldNoteJoint),
        getEntities(store.grid.doubleHoldNoteConnection),
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
