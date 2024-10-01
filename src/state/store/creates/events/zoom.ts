import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toZoomEventConnectionEntity } from '../../../entities/events/connections/zoom'
import { toZoomEventJointEntity } from '../../../entities/events/joints/zoom'
import type { StoreGrid } from '../../grid'

export const createStoreZoomEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.zoomEvents,
        toZoomEventJointEntity,
        toZoomEventConnectionEntity,
    )
