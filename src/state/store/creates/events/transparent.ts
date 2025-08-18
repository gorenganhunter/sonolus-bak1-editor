import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toTransparentEventConnectionEntity } from '../../../entities/events/connections/transparent'
import { toTransparentEventJointEntity } from '../../../entities/events/joints/transparent'
import type { StoreGrid } from '../../grid'

export const createStoreTransparentEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.transparentEvents,
        toTransparentEventJointEntity,
        toTransparentEventConnectionEntity,
    )
