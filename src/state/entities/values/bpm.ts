import { toValueEntity, type BaseValueEntity } from '.'
import type { ValueObject } from '../../../chart'

export type BpmEntity = BaseValueEntity & {
    type: 'bpm'
}

export const toBpmEntity = (object: ValueObject): BpmEntity => ({
    type: 'bpm',
    ...toValueEntity(object, -1),
})
