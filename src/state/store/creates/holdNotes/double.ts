import { createStoreHoldNotes } from '.'
import type { Chart } from '../../../../chart'
import { toDoubleHoldNoteConnectionEntity } from '../../../entities/holdNotes/connections/double'
import { toDoubleHoldNoteJointEntity } from '../../../entities/holdNotes/joints/double'
import { type StoreGrid } from '../../grid'
import type { HoldNoteRanges } from '../../holdNoteRanges'

export const createStoreDoubleHoldNotes = (
    grid: StoreGrid,
    holdNoteRanges: HoldNoteRanges,
    chart: Chart,
) => {
    createStoreHoldNotes(
        grid,
        holdNoteRanges,
        chart.doubleHoldNotes,
        'doubleHoldNoteJoint',
        toDoubleHoldNoteJointEntity,
        toDoubleHoldNoteConnectionEntity,
    )
}
