import type { AddMutation, RemoveMutation } from '..'
import type { BaseNoteObject } from '../../../chart'
import { toFlickNoteEntity, type FlickNoteEntity } from '../../entities/notes/flickNote'
import { addToStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addFlickNote: AddMutation<BaseNoteObject> = ({ store }, object) => {
    const entity = toFlickNoteEntity(object)
    addToStoreGrid(store.grid, entity, entity.beat)

    return [entity]
}

export const removeFlickNote: RemoveMutation<FlickNoteEntity> = ({ store }, entity) => {
    removeFromStoreGrid(store.grid, entity, entity.beat)
}
