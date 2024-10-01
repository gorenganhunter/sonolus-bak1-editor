import type { Chart } from '../../../chart'
import { toTapNoteEntity } from '../../entities/tapNote'
import { addToStoreGrid, type StoreGrid } from '../grid'

export const createStoreTapNotes = (grid: StoreGrid, chart: Chart) => {
    for (const object of chart.tapNotes) {
        const entity = toTapNoteEntity(object)

        addToStoreGrid(grid, entity, entity.beat)
    }
}
