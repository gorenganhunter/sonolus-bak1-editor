import type { HoldNoteJointObject } from '../../../../chart'
import type { EntityOfType } from '../../../entities'
import { createHoldNoteId, type HoldNoteId } from '../../../entities/holdNotes'
import type { HoldNoteConnectionEntityType } from '../../../entities/holdNotes/connections'
import type { HoldNoteJointEntityType } from '../../../entities/holdNotes/joints'
import { addToStoreGrid, type StoreGrid } from '../../grid'
import type { HoldNoteRanges } from '../../holdNoteRanges'

export const createStoreHoldNotes = <
    T extends HoldNoteJointObject,
    U extends HoldNoteJointEntityType,
    V extends HoldNoteConnectionEntityType,
>(
    grid: StoreGrid,
    holdNoteRanges: HoldNoteRanges,
    objects: T[][],
    jointType: U,
    toJointEntity: (id: HoldNoteId, object: T) => EntityOfType<U>,
    toConnectionEntity: (min: EntityOfType<U>, max: EntityOfType<U>) => EntityOfType<V>,
) => {
    for (const object of objects) {
        const id = createHoldNoteId()
        let prev: EntityOfType<U> | undefined

        for (const joint of [...object].sort((a, b) => a.beat - b.beat)) {
            const entity = toJointEntity(id, joint)

            if (prev) addToStoreGrid(grid, toConnectionEntity(prev, entity), prev.beat, entity.beat)

            addToStoreGrid(grid, entity, entity.beat)

            const range = holdNoteRanges[jointType].get(id)
            if (range) {
                range.max = entity
            } else {
                holdNoteRanges[jointType].set(id, {
                    min: entity,
                    max: entity,
                })
            }

            prev = entity
        }
    }
}
