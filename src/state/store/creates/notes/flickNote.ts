import type { Chart } from '../../../../chart'
import { toFlickNoteEntity } from '../../../entities/notes/flickNote'
import { addToStoreGrid, type StoreGrid } from '../../grid'

export const createStoreFlickNotes = (grid: StoreGrid, chart: Chart) => {
    for (const object of chart.flickNotes) {
        const entity = toFlickNoteEntity(object)

        addToStoreGrid(grid, entity, entity.beat)
    }
}
