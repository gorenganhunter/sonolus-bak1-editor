import type { Stage } from '../../chart'
import type { EventRanges } from './eventRanges'
import type { StoreGrid } from './grid'
import type { StoreSlides } from './slides'

export type Store = {
    grid: StoreGrid
    slides: StoreSlides
    eventRanges: EventRanges
    stages: Stage[]
}
