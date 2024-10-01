import type { Range } from '../../../../../utils/range'

export type SegmentJoint = {
    time: number
    s: number
}

export type Segment = Range<SegmentJoint>
