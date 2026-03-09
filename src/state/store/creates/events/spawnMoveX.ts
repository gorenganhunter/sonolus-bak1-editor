import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toSpawnMoveXEventConnectionEntity } from '../../../entities/events/connections/spawnMoveX'
import { toSpawnMoveXEventJointEntity } from '../../../entities/events/joints/spawnMoveX'
import type { StoreGrid } from '../../grid'

export const createStoreSpawnMoveXEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.spawnMoveXEvents,
        toSpawnMoveXEventJointEntity,
        toSpawnMoveXEventConnectionEntity,
    )
