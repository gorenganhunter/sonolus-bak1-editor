import type { AddMutation, RemoveMutation } from '..'
import type { BaseNoteObject } from '../../../chart'
import { toDragNoteEntity, type DragNoteEntity } from '../../entities/notes/dragNote'
import { addToStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addDragNote: AddMutation<BaseNoteObject> = ({ store }, object) => {
    const entity = toDragNoteEntity(object)
    addToStoreGrid(store.grid, entity, entity.beat)

    return [entity]
}

export const removeDragNote: RemoveMutation<DragNoteEntity> = ({ store }, entity) => {
    removeFromStoreGrid(store.grid, entity, entity.beat)
}
