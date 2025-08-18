import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toResizeEventConnectionEntity } from '../../../entities/events/connections/resize'
import { toResizeEventJointEntity } from '../../../entities/events/joints/resize'
import type { StoreGrid } from '../../grid'

export const createStoreResizeEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.resizeEvents,
        toResizeEventJointEntity,
        toResizeEventConnectionEntity,
    )
