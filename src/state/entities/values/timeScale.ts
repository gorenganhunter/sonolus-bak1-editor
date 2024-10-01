import { toValueEntity, type BaseValueEntity } from '.'
import type { ValueObject } from '../../../chart'

export type TimeScaleEntity = BaseValueEntity & {
    type: 'timeScale'
}

export const toTimeScaleEntity = (object: ValueObject): TimeScaleEntity => ({
    type: 'timeScale',
    ...toValueEntity(object, 8),
})
