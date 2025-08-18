import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toMoveXEventConnectionEntity } from '../../../entities/events/connections/moveX'
import { toMoveXEventJointEntity } from '../../../entities/events/joints/moveX'
import type { StoreGrid } from '../../grid'

export const createStoreMoveXEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.moveXEvents,
        toMoveXEventJointEntity,
        toMoveXEventConnectionEntity,
    )
