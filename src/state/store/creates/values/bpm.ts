import { createStoreValueEntities } from '.'
import type { Chart } from '../../../../chart'
import { toBpmEntity } from '../../../entities/values/bpm'
import type { StoreGrid } from '../../grid'

export const createStoreBpms = (grid: StoreGrid, chart: Chart) => {
    createStoreValueEntities(grid, chart.bpms, toBpmEntity)
}
