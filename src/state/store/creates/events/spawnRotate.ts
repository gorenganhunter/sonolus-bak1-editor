import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toSpawnRotateEventConnectionEntity } from '../../../entities/events/connections/spawnRotate'
import { toSpawnRotateEventJointEntity } from '../../../entities/events/joints/spawnRotate'
import type { StoreGrid } from '../../grid'

export const createStoreSpawnRotateEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.spawnRotateEvents,
        toSpawnRotateEventJointEntity,
        toSpawnRotateEventConnectionEntity,
    )
