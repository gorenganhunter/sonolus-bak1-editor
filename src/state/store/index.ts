import type { EventRanges } from './eventRanges'
import type { StoreGrid } from './grid'
import type { HoldNoteRanges } from './holdNoteRanges'

export type Store = {
    grid: StoreGrid
    eventRanges: EventRanges
    holdNoteRanges: HoldNoteRanges
}
