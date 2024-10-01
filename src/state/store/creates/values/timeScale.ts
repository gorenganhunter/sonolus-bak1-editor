import { createStoreValueEntities } from '.'
import type { Chart } from '../../../../chart'
import { toTimeScaleEntity } from '../../../entities/values/timeScale'
import type { StoreGrid } from '../../grid'

export const createStoreTimeScales = (grid: StoreGrid, chart: Chart) => {
    createStoreValueEntities(grid, chart.timeScales, toTimeScaleEntity)
}
