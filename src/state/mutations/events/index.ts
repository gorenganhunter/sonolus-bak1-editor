import type { EventObject } from '../../../chart'
import { view } from '../../../editor/view'
import type { EntityOfType } from '../../entities'
import type { EventConnectionEntityType } from '../../entities/events/connections'
import type { EventJointEntityType } from '../../entities/events/joints'
import type { Store } from '../../store'
import { addToStoreGrid, getInStoreGrid, removeFromStoreGrid } from '../../store/grid'

export const addEventJoint = <T extends EventJointEntityType, U extends EventConnectionEntityType>(
    store: Store,
    object: EventObject,
    toJointEntity: (object: EventObject) => EntityOfType<T>,
    connectionType: U,
    toConnectionEntity: (min: EntityOfType<T>, max: EntityOfType<T>) => EntityOfType<U>,
) => {
    const joint = toJointEntity(object)

    const connection = getInStoreGrid(store.grid, connectionType, joint.beat)?.find(
        (entity) => entity.min.beat < joint.beat && entity.max.beat > joint.beat && entity.stage === object.stage,
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
        let evs: any[] = []
        store.grid[joint.type].forEach(b => [...b].forEach(a => { if (a.stage === object.stage) evs.push(a) }))
        evs = evs.sort((a, b) => a.beat - b.beat)
        const range = evs.length ? { min: evs[0], max: evs[evs.length - 1] } : null
        if (range) {
            if (joint.beat < range.min.beat) {
                addToStoreGrid(
                    store.grid,
                    toConnectionEntity(joint, range.min),
                    joint.beat,
                    range.min.beat,
                )
                store.eventRanges[joint.type]?.set(object.stage, {
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
                store.eventRanges[joint.type]?.set(object.stage, {
                    min: range.min,
                    max: joint,
                })
            }
        } else {
            store.eventRanges[joint.type]?.set(object.stage, {
                min: joint,
                max: joint,
            })
        }
    }

    addToStoreGrid(store.grid, joint, joint.beat)
    return [joint]
}

export const removeEventJoint = <
    T extends EventJointEntityType,
    U extends EventConnectionEntityType,
>(
    store: Store,
    joint: EntityOfType<T>,
    connectionType: U,
    toConnectionEntity: (min: EntityOfType<T>, max: EntityOfType<T>) => EntityOfType<U>,
) => {
    const entities = getInStoreGrid(store.grid, connectionType, joint.beat)
    const prev = entities?.find((entity) => entity.max === joint)
    const next = entities?.find((entity) => entity.min === joint)

    let evs: any[] = []
    store.grid[joint.type].forEach(b => [...b].forEach(a => { if (a.stage === joint.stage) evs.push(a) }))
    evs = evs.sort((a, b) => a.beat - b.beat)
    const range = evs.length ? { min: evs[0], max: evs[evs.length - 1] } : null
    if (!range) throw new Error('Unexpected event range not found')

    if (!prev && !next) store.eventRanges[joint.type]?.delete(joint.stage)

    if (prev) {
        removeFromStoreGrid(store.grid, prev, prev.min.beat, prev.max.beat)
        if (range.max === joint)
            store.eventRanges[joint.type]?.set(joint.stage, {
                min: range.min,
                max: prev.min,
            })
    }

    if (next) {
        removeFromStoreGrid(store.grid, next, next.min.beat, next.max.beat)
        if (range.min === joint)
            store.eventRanges[joint.type]?.set(joint.stage, {
                min: next.max,
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

    removeFromStoreGrid(store.grid, joint, joint.beat)
}
