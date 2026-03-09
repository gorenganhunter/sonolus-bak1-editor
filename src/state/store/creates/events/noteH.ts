import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toNoteHEventConnectionEntity } from '../../../entities/events/connections/noteH'
import { toNoteHEventJointEntity } from '../../../entities/events/joints/noteH'
import type { StoreGrid } from '../../grid'

export const createStoreNoteHEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.noteHEvents,
        toNoteHEventJointEntity,
        toNoteHEventConnectionEntity,
    )
