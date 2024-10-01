import { addValue, removeValue } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { ValueObject } from '../../../chart'
import { toTimeScaleEntity, type TimeScaleEntity } from '../../entities/values/timeScale'
import { toTimeScaleIntegral } from '../../integrals/timeScales'

export const addTimeScale: AddMutation<ValueObject> = ({ store, timeScales }, object) =>
    addValue(store, timeScales, object, toTimeScaleIntegral, toTimeScaleEntity)

export const removeTimeScale: RemoveMutation<TimeScaleEntity> = ({ store, timeScales }, entity) => {
    removeValue(store, timeScales, entity)
}
