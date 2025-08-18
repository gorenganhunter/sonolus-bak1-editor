import type { AddMutation, RemoveMutation } from '..'
import type { BaseNoteObject } from '../../../chart'
import { toTapNoteEntity, type TapNoteEntity } from '../../entities/notes/tapNote'
import { addToStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addTapNote: AddMutation<BaseNoteObject> = ({ store }, object) => {
    const entity = toTapNoteEntity(object)
    addToStoreGrid(store.grid, entity, entity.beat)

    return [entity]
}

export const removeTapNote: RemoveMutation<TapNoteEntity> = ({ store }, entity) => {
    removeFromStoreGrid(store.grid, entity, entity.beat)
}
