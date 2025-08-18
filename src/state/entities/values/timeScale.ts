import { toStageValueEntity, toValueEntity, type BaseValueEntity } from '.'
import type { StageValueObject } from '../../../chart'

export type TimeScaleEntity = BaseValueEntity & {
    type: 'timeScale'
    stage: number
}

export const toTimeScaleEntity = (object: StageValueObject): TimeScaleEntity => ({
    type: 'timeScale',
    ...toStageValueEntity(object, -0.0625),
})
