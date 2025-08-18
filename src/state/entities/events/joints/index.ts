import type { BaseEntity } from '../..'
import type { Ease, EventObject } from '../../../../chart'
import type { MoveXEventJointEntity } from './moveX'
import type { MoveYEventJointEntity } from './moveY'
import type { ResizeEventJointEntity } from './resize'
import type { RotateEventJointEntity } from './rotate'
import type { TransparentEventJointEntity } from './transparent'

export type EventJointEntity = RotateEventJointEntity | ResizeEventJointEntity | TransparentEventJointEntity | MoveXEventJointEntity | MoveYEventJointEntity

export type EventJointEntityType = EventJointEntity['type']

export type BaseEventJointEntity = BaseEntity & {
    value: number
    ease: Ease
    stage: number
}

export const toEventJointEntity = (object: EventObject, hitboxLane: number) => ({
    hitbox: {
        lane: hitboxLane,
        beat: object.beat,
        w: 0.1,
        t: 0.1,
        b: 0.1,
    },

    beat: object.beat,
    value: object.value,
    ease: object.ease,
    stage: object.stage
})
