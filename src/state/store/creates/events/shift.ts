import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toShiftEventConnectionEntity } from '../../../entities/events/connections/shift'
import { toShiftEventJointEntity } from '../../../entities/events/joints/shift'
import type { StoreGrid } from '../../grid'

export const createStoreShiftEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.shiftEvents,
        toShiftEventJointEntity,
        toShiftEventConnectionEntity,
    )
