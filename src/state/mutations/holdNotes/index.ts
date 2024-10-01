import type { HoldNoteJointObject } from '../../../chart'
import type { EntityOfType } from '../../entities'
import { type HoldNoteId } from '../../entities/holdNotes'
import type { HoldNoteConnectionEntityType } from '../../entities/holdNotes/connections'
import type { HoldNoteJointEntityType } from '../../entities/holdNotes/joints'
import type { Store } from '../../store'
import { addToStoreGrid, getInStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addHoldNoteJoint = <
    T extends HoldNoteJointObject,
    U extends HoldNoteJointEntityType,
    V extends HoldNoteConnectionEntityType,
>(
    store: Store,
    id: HoldNoteId,
    object: T,
    jointType: U,
    toJointEntity: (id: HoldNoteId, object: T) => EntityOfType<U>,
    connectionType: V,
    toConnectionEntity: (min: EntityOfType<U>, max: EntityOfType<U>) => EntityOfType<V>,
) => {
    const joint = toJointEntity(id, object)
    addToStoreGrid(store.grid, joint, joint.beat)

    const connection = getInStoreGrid(store.grid, connectionType, joint.beat)?.find(
        (entity) =>
            entity.min.id === id && entity.min.beat < joint.beat && entity.max.beat > joint.beat,
    )
    if (connection) {
        removeFromStoreGrid(store.grid, connection, connection.min.beat, connection.max.beat)
        addToStoreGrid(
            store.grid,
            toConnectionEntity(connection.min as never, joint),
            connection.min.beat,
            joint.beat,
        )
        addToStoreGrid(
            store.grid,
            toConnectionEntity(joint, connection.max as never),
            joint.beat,
            connection.max.beat,
        )
    } else {
        const range = store.holdNoteRanges[jointType].get(id)
        if (range) {
            if (joint.beat < range.min.beat) {
                addToStoreGrid(
                    store.grid,
                    toConnectionEntity(joint, range.min),
                    joint.beat,
                    range.min.beat,
                )
                store.holdNoteRanges[jointType].set(id, {
                    min: joint,
                    max: range.max,
                })
            } else {
                addToStoreGrid(
                    store.grid,
                    toConnectionEntity(range.max, joint),
                    range.max.beat,
                    joint.beat,
                )
                store.holdNoteRanges[jointType].set(id, {
                    min: range.min,
                    max: joint,
                })
            }
        } else {
            store.holdNoteRanges[jointType].set(id, {
                min: joint,
                max: joint,
            })
        }
    }

    return [joint]
}

export const removeHoldNoteJoint = <
    T extends HoldNoteJointEntityType,
    U extends HoldNoteConnectionEntityType,
>(
    store: Store,
    joint: EntityOfType<T>,
    jointType: T,
    connectionType: U,
    toConnectionEntity: (min: EntityOfType<T>, max: EntityOfType<T>) => EntityOfType<U>,
) => {
    removeFromStoreGrid(store.grid, joint, joint.beat)

    const entities = getInStoreGrid(store.grid, connectionType, joint.beat)
    const prev = entities?.find((entity) => entity.max === joint)
    const next = entities?.find((entity) => entity.min === joint)

    const range = store.holdNoteRanges[jointType].get(joint.id)
    if (!range) throw new Error('Unexpected hold note range not found')

    if (!prev && !next) store.holdNoteRanges[jointType].delete(joint.id)

    if (prev) {
        removeFromStoreGrid(store.grid, prev, prev.min.beat, prev.max.beat)
        if (range.max === joint)
            store.holdNoteRanges[jointType].set(joint.id, {
                min: range.min,
                max: prev.min as never,
            })
    }

    if (next) {
        removeFromStoreGrid(store.grid, next, next.min.beat, next.max.beat)
        if (range.min === joint)
            store.holdNoteRanges[jointType].set(joint.id, {
                min: next.max as never,
                max: range.max,
            })
    }

    if (prev && next)
        addToStoreGrid(
            store.grid,
            toConnectionEntity(prev.min as never, next.max as never),
            prev.min.beat,
            next.max.beat,
        )
}
