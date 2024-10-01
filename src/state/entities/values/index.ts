import type { BaseEntity } from '..'
import type { ValueObject } from '../../../chart'
import type { BpmEntity } from './bpm'
import type { TimeScaleEntity } from './timeScale'

export type ValueEntity = BpmEntity | TimeScaleEntity

export type ValueEntityType = ValueEntity['type']

export type BaseValueEntity = BaseEntity & {
    value: number
}

export const toValueEntity = (object: ValueObject, hitboxLane: number) => ({
    hitbox: {
        lane: hitboxLane,
        beat: object.beat,
        w: 0.5,
        t: 0.25,
        b: 0.25,
    },

    beat: object.beat,
    value: object.value,
})
