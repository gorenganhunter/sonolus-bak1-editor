import { createStoreHoldNotes } from '.'
import type { Chart } from '../../../../chart'
import { toSingleHoldNoteConnectionEntity } from '../../../entities/holdNotes/connections/single'
import { toSingleHoldNoteJointEntity } from '../../../entities/holdNotes/joints/single'
import { type StoreGrid } from '../../grid'
import type { HoldNoteRanges } from '../../holdNoteRanges'

export const createStoreSingleHoldNotes = (
    grid: StoreGrid,
    holdNoteRanges: HoldNoteRanges,
    chart: Chart,
) => {
    createStoreHoldNotes(
        grid,
        holdNoteRanges,
        chart.singleHoldNotes,
        'singleHoldNoteJoint',
        toSingleHoldNoteJointEntity,
        toSingleHoldNoteConnectionEntity,
    )
}
