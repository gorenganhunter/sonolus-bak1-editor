import type { AddMutation, RemoveMutation } from '..'
import type { StageValueObject, ValueObject } from '../../../chart'
import { addToOrdered, removeFromOrdered } from '../../../utils/ordered'
import { toTimeScaleEntity, type TimeScaleEntity } from '../../entities/values/timeScale'
import { toTimeScaleIntegral } from '../../integrals/timeScales'
import { addToStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addTimeScale: AddMutation<StageValueObject> = ({ store, timeScales }, object) => {
    console.log(object)
    addToOrdered(timeScales, 'beat', toTimeScaleIntegral(object))
    console.log("ord", timeScales)
    const entity = toTimeScaleEntity(object)
    addToStoreGrid(store.grid, entity, entity.beat)
    console.log("addT", store.grid.timeScale)
    return [entity]
}

export const removeTimeScale: RemoveMutation<TimeScaleEntity> = ({ store, timeScales }, entity) => {
    removeFromOrdered(timeScales, 'beat', entity.beat)

    removeFromStoreGrid(store.grid, entity, entity.beat)
}
