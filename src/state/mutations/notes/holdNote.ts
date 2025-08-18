import type { AddMutation, RemoveMutation } from '..'
import type { HoldNoteObject } from '../../../chart'
import { toHoldNoteEntity, type HoldNoteEntity } from '../../entities/notes/holdNote'
import { addToStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addHoldNote: AddMutation<HoldNoteObject> = ({ store }, object) => {
    const entity = toHoldNoteEntity(object)
    addToStoreGrid(store.grid, entity, entity.beat)

    return [entity]
}

export const removeHoldNote: RemoveMutation<HoldNoteEntity> = ({ store }, entity) => {
    removeFromStoreGrid(store.grid, entity, entity.beat)
}
