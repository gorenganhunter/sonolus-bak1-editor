import { createStoreValueEntities } from '.'
import type { Chart } from '../../../../chart'
import { toTimeScaleEntity } from '../../../entities/values/timeScale'
import { addToStoreGrid, type StoreGrid } from '../../grid'

export const createStoreTimeScales = (grid: StoreGrid, chart: Chart) => {
    for (const object of chart.timeScales) {
        const entity = toTimeScaleEntity(object)

        addToStoreGrid(grid, entity, entity.beat)
    }
}
