import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toSpawnMoveYEventConnectionEntity } from '../../../entities/events/connections/spawnMoveY'
import { toSpawnMoveYEventJointEntity } from '../../../entities/events/joints/spawnMoveY'
import type { StoreGrid } from '../../grid'

export const createStoreSpawnMoveYEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.spawnMoveYEvents,
        toSpawnMoveYEventJointEntity,
        toSpawnMoveYEventConnectionEntity,
    )
