import type { Chart } from '../../../../chart'
import { toHoldNoteEntity } from '../../../entities/notes/holdNote'
import { addToStoreGrid, type StoreGrid } from '../../grid'

export const createStoreHoldNotes = (grid: StoreGrid, chart: Chart) => {
    for (const object of chart.holdNotes) {
        const entity = toHoldNoteEntity(object)

        addToStoreGrid(grid, entity, entity.beat)
    }
}
