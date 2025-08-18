import type { RectStageObject } from '../../chart'
import type { EventRanges } from './eventRanges'
import type { StoreGrid } from './grid'

export type Store = {
    grid: StoreGrid
    eventRanges: EventRanges
    stages: RectStageObject[]
}
