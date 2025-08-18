import type { BaseEntity } from '../..'
import type { Range } from '../../../../utils/range'
import type { EventJointEntity } from '../joints'
import type { MoveXEventConnectionEntity } from './moveX'
import type { MoveYEventConnectionEntity } from './moveY'
import type { ResizeEventConnectionEntity } from './resize'
import type { RotateEventConnectionEntity } from './rotate'
import type { TransparentEventConnectionEntity } from './transparent'

export type EventConnectionEntity = RotateEventConnectionEntity | ResizeEventConnectionEntity | TransparentEventConnectionEntity | MoveXEventConnectionEntity | MoveYEventConnectionEntity

export type EventConnectionEntityType = EventConnectionEntity['type']

export type BaseEventConnectionEntity<T extends EventJointEntity> = BaseEntity & Range<T> & { stage: number }

export const toEventConnectionEntity = <T extends EventJointEntity>(min: T, max: T) => ({
    beat: min.beat,
    stage: min.stage,
    min,
    max,
})
