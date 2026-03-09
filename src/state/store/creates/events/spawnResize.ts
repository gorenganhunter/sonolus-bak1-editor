import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toSpawnResizeEventConnectionEntity } from '../../../entities/events/connections/spawnResize'
import { toSpawnResizeEventJointEntity } from '../../../entities/events/joints/spawnResize'
import type { StoreGrid } from '../../grid'

export const createStoreSpawnResizeEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.spawnResizeEvents,
        toSpawnResizeEventJointEntity,
        toSpawnResizeEventConnectionEntity,
    )
