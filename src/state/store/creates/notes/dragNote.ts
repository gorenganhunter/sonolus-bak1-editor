import type { Chart } from '../../../../chart'
import { toDragNoteEntity } from '../../../entities/notes/dragNote'
import { addToStoreGrid, type StoreGrid } from '../../grid'

export const createStoreDragNotes = (grid: StoreGrid, chart: Chart) => {
    for (const object of chart.dragNotes) {
        const entity = toDragNoteEntity(object)

        addToStoreGrid(grid, entity, entity.beat)
    }
}
