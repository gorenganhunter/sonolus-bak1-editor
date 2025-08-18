import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toMoveYEventConnectionEntity } from '../../../entities/events/connections/moveY'
import { toMoveYEventJointEntity } from '../../../entities/events/joints/moveY'
import type { StoreGrid } from '../../grid'

export const createStoreMoveYEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.moveYEvents,
        toMoveYEventJointEntity,
        toMoveYEventConnectionEntity,
    )
