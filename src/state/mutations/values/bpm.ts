import { addValue, removeValue } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { ValueObject } from '../../../chart'
import { toBpmEntity, type BpmEntity } from '../../entities/values/bpm'
import { toBpmIntegral } from '../../integrals/bpms'

export const addBpm: AddMutation<ValueObject> = ({ store, bpms }, object) =>
    addValue(store, bpms, object, toBpmIntegral, toBpmEntity)

export const removeBpm: RemoveMutation<BpmEntity> = ({ store, bpms }, entity) => {
    removeValue(store, bpms, entity)
}
