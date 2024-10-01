import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toRotateEventConnectionEntity } from '../../../entities/events/connections/rotate'
import { toRotateEventJointEntity } from '../../../entities/events/joints/rotate'
import type { StoreGrid } from '../../grid'

export const createStoreRotateEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.rotateEvents,
        toRotateEventJointEntity,
        toRotateEventConnectionEntity,
    )
