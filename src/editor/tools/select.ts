import { type Tool } from '.'
import type {
    EventObject,
    BaseNoteObject,
    ValueObject,
    HoldNoteObject,
    StageValueObject,
} from '../../chart'
import { pushState, replaceState, state } from '../../history'
import { selectedEntities } from '../../history/selectedEntities'
import { i18n } from '../../i18n'
import type { Entity, EntityOfType, EntityType } from '../../state/entities'
import type { EventJointEntityType } from '../../state/entities/events/joints'
import { laneToMoveXEventValue, toMoveXEventJointEntity } from '../../state/entities/events/joints/moveX'
import { laneToMoveYEventValue, toMoveYEventJointEntity } from '../../state/entities/events/joints/moveY'
import { laneToResizeEventValue, toResizeEventJointEntity } from '../../state/entities/events/joints/resize'
import {
    toRotateEventJointEntity,
    type RotateEventJointEntity,
} from '../../state/entities/events/joints/rotate'
import { laneToTransparentEventValue, toTransparentEventJointEntity } from '../../state/entities/events/joints/transparent'
import { toDragNoteEntity, type DragNoteEntity } from '../../state/entities/notes/dragNote'
import { toFlickNoteEntity, type FlickNoteEntity } from '../../state/entities/notes/flickNote'
import { toHoldNoteEntity, type HoldNoteEntity } from '../../state/entities/notes/holdNote'
import { toTapNoteEntity, type TapNoteEntity } from '../../state/entities/notes/tapNote'
import type { ValueEntity, ValueEntityType } from '../../state/entities/values'
import { toBpmEntity } from '../../state/entities/values/bpm'
import { toTimeScaleEntity, type TimeScaleEntity } from '../../state/entities/values/timeScale'
import type { AddMutation, RemoveMutation } from '../../state/mutations'
import { addMoveXEventJoint, removeMoveXEventJoint } from '../../state/mutations/events/moveX'
import { addMoveYEventJoint, removeMoveYEventJoint } from '../../state/mutations/events/moveY'
import { addResizeEventJoint, removeResizeEventJoint } from '../../state/mutations/events/resize'
import { addRotateEventJoint, removeRotateEventJoint } from '../../state/mutations/events/rotate'
import { addTransparentEventJoint, removeTransparentEventJoint } from '../../state/mutations/events/transparent'
import { addDragNote, removeDragNote } from '../../state/mutations/notes/dragNote'
import { addFlickNote, removeFlickNote } from '../../state/mutations/notes/flickNote'
import { addHoldNote, removeHoldNote } from '../../state/mutations/notes/holdNote'
import { addTapNote, removeTapNote } from '../../state/mutations/notes/tapNote'
import { addBpm, removeBpm } from '../../state/mutations/values/bpm'
import { addTimeScale, removeTimeScale } from '../../state/mutations/values/timeScale'
import { getInStoreGrid } from '../../state/store/grid'
import { createTransaction, type Transaction } from '../../state/transaction'
import { interpolate } from '../../utils/interpolate'
import { align, clamp, mod } from '../../utils/math'
import { notify } from '../notification'
import {
    focusViewAtBeat,
    setViewHover,
    view,
    xToLane,
    yToBeatOffset,
    yToTime,
    yToValidBeat,
} from '../view'
import {
    hitAllEntitiesAtPoint,
    hitAllEntitiesInSelection,
    modifyEntities,
    toSelection,
} from './utils'

let active:
    | {
        // <<<<<<< HEAD
        //         type: 'select'
        //         lane: number
        //         time: number
        //         count: number
        //         entities: Entity[]
        //     }
        //     | {
        //         type: 'move'
        //         lane: number
        //         beat: number
        //         entities: Entity[]
        //     }
        // =======
        type: 'move'
        lane: number
        focus: Entity
        entities: Entity[]
    }
    | {
        type: 'select'
        lane: number
        time: number
        count: number
        entities: Entity[]
    }
    // >>>>>>> upstream/main
    | undefined

export const select: Tool = {
    hover(x, y, modifiers) {
        const entities = modifyEntities(hitAllEntitiesAtPoint(x, y), modifiers)

        view.entities = {
            hovered: entities,
            creating: [],
        }
    },

    tap(x, y, modifiers) {
        if (modifiers.ctrl) {
            const entities = modifyEntities(hitAllEntitiesAtPoint(x, y), modifiers)

            const [entity] = entities
            if (!entity) return

            const targets = entities.every((entity) => selectedEntities.value.includes(entity))
                ? selectedEntities.value.filter((entity) => !entities.includes(entity))
                : [...new Set([...selectedEntities.value, ...entities])]

            replaceState({
                ...state.value,
                selectedEntities: targets,
            })
            view.entities = {
                hovered: entities,
                creating: [],
            }
            focusViewAtBeat(entity.beat)

            notify(interpolate(() => i18n.value.tools.select.selected, `${targets.length}`))
        } else {
            const entities = hitAllEntitiesAtPoint(x, y)

            const selectedLength = selectedEntities.value.length
            const current = selectedLength ? selectedEntities.value[0] : undefined

            const index = current ? (entities.indexOf(current) + 1) % entities.length : 0
            const entity = entities[index]
            const targets = modifyEntities(entity ? [entity] : [], modifiers)

            replaceState({
                ...state.value,
                selectedEntities: targets,
            })
            view.entities = {
                hovered: entities,
                creating: [],
            }

            if (entity) {
                focusViewAtBeat(entity.beat)

                notify(interpolate(() => i18n.value.tools.select.selected, `${targets.length}`))
            } else {
                focusViewAtBeat(yToValidBeat(y))

                if (selectedLength) notify(() => i18n.value.tools.select.deselected)
            }
        }
    },

    dragStart(x, y) {
        const lane = xToLane(x)
        const time = yToTime(y)

        const entities = hitAllEntitiesAtPoint(x, y)

        const [focus] = entities.filter((entity) => selectedEntities.value.includes(entity))
        if (focus) {
            focusViewAtBeat(focus.beat)

            notify(
                interpolate(
                    () => i18n.value.tools.select.moving,
                    `${selectedEntities.value.length}`,
                ),
            )

            active = {
                type: 'move',
                lane,
                focus,
                entities: selectedEntities.value,
            }
        } else {
            const [entity] = entities
            if (entity) {
                replaceState({
                    ...state.value,
                    selectedEntities: [entity],
                })
                view.entities = {
                    hovered: [],
                    creating: [],
                }
                focusViewAtBeat(entity.beat)

                notify(interpolate(() => i18n.value.tools.select.moving, '1'))

                active = {
                    type: 'move',
                    lane,
                    focus: entity,
                    entities: [entity],
                }
            } else {
                active = {
                    type: 'select',
                    lane,
                    time,
                    count: -1,
                    entities: selectedEntities.value,
                }
            }
        }

        return true
    },

    dragUpdate(x, y, modifiers) {
        if (!active) return

        setViewHover(x, y)

        switch (active.type) {
            case 'move': {
                const lane = xToLane(x)
                const beatOffset = yToBeatOffset(y, active.focus.beat)

                const creating: Entity[] = []
                for (const entity of active.entities) {
                    const beat = entity.beat + beatOffset
                    if (beat < 0) continue

                    const result = creates[entity.type]?.(
                        active.entities,
                        entity as never,
                        active.lane,
                        lane,
                        beat,
                        active.focus,
                    )
                    if (!result) continue

                    creating.push(result)
                }

                view.entities = {
                    hovered: [],
                    creating,
                }
                focusViewAtBeat(active.focus.beat + beatOffset)
                break
            }
            case 'select': {
                const selection = toSelection(active.lane, active.time, x, y)
                const entities = modifyEntities(hitAllEntitiesInSelection(selection), modifiers)
                const targets = modifiers.ctrl
                    ? [...new Set([...active.entities, ...entities])]
                    : entities

                replaceState({
                    ...state.value,
                    selectedEntities: targets,
                })
                view.selection = selection
                view.entities = {
                    hovered: [],
                    creating: [],
                }

                if (active.count === targets.length) return
                active.count = targets.length

                notify(interpolate(() => i18n.value.tools.select.selecting, `${targets.length}`))
                break
            }
        }
    },

    dragEnd(x, y, modifiers) {
        if (!active) return

        switch (active.type) {
            case 'move': {
                const transaction = createTransaction(state.value)

                const lane = xToLane(x)
                const beatOffset = yToBeatOffset(y, active.focus.beat)

                const entities = active.entities.sort(
                    beatOffset > 0 ? (a, b) => b.beat - a.beat : (a, b) => a.beat - b.beat,
                )

                const selectedEntities: Entity[] = []
                for (const entity of entities) {
                    const beat = entity.beat + beatOffset
                    if (beat < 0) continue

                    const result = moves[entity.type]?.(
                        transaction,
                        entities,
                        entity as never,
                        active.lane,
                        lane,
                        beat,
                        active.focus,
                    )
                    if (!result) continue

                    selectedEntities.push(...result)
                }

                pushState(
                    interpolate(() => i18n.value.tools.select.moved, `${selectedEntities.length}`),
                    {
                        ...transaction.commit(),
                        selectedEntities,
                    },
                )
                view.entities = {
                    hovered: [],
                    creating: [],
                }
                focusViewAtBeat(active.focus.beat + beatOffset)

                notify(
                    interpolate(() => i18n.value.tools.select.moved, `${selectedEntities.length}`),
                )
                break
            }
            case 'select': {
                const selection = toSelection(active.lane, active.time, x, y)
                const entities = modifyEntities(hitAllEntitiesInSelection(selection), modifiers)
                const targets = modifiers.ctrl
                    ? [...new Set([...active.entities, ...entities])]
                    : entities

                replaceState({
                    ...state.value,
                    selectedEntities: targets,
                })
                view.selection = undefined
                view.entities = {
                    hovered: [],
                    creating: [],
                }

                notify(interpolate(() => i18n.value.tools.select.selected, `${targets.length}`))
                break
            }
        }

        active = undefined
    },
}

const toMovedValueObject = (entity: ValueEntity, beat: number): ValueObject => ({
    beat,
    value: entity.value,
})

const toMovedStageValueObject = (entity: TimeScaleEntity, beat: number): StageValueObject => ({
    beat,
    value: entity.value,
    stage: view.stage
})

const toMovedEventObject = <T extends EventJointEntityType>(
    type: T,
    laneToValue: (lane: number) => number,
    entities: Entity[],
    entity: EntityOfType<T>,
    startLane: number,
    lane: number,
    beat: number,
): EventObject => ({
    beat,
    value: entities.some((entity) => entity.type !== type)
        ? entity.value
        : entity.value + align(laneToValue(lane), 10) - align(laneToValue(startLane), 10),
    ease: entity.ease,
    stage: view.stage
})

const toMovedRotateEventObject = (
    entities: Entity[],
    entity: RotateEventJointEntity,
    startLane: number,
    lane: number,
    beat: number,
): EventObject => {
    const division = entities.some(
        ({ type }) =>
            type === 'tapNote' || type === 'holdNote' || type === 'dragNote' || type === "flickNote",
    )
        ? 1
        : 1

    return {
        beat,
        value: entity.value - align(lane, division) + align(startLane, division),
        ease: entity.ease,
        stage: view.stage
    }
}

const toMovedNoteObject = (
    entity: TapNoteEntity | DragNoteEntity | FlickNoteEntity,
    startLane: number,
    lane: number,
    beat: number,
): BaseNoteObject => ({
    beat,
    lane: mod(entity.lane + align(lane, view.lane) - align(startLane, view.lane), 4),
    size: entity.size,
    stage: view.stage
})

const toMovedHoldNoteObject = (
    entity: HoldNoteEntity,
    startLane: number,
    lane: number,
    beat: number,
): HoldNoteObject => ({
    beat,
    // <<<<<<< HEAD
    lane: mod(entity.lane + align(lane, view.lane) - align(startLane, view.lane), 4),
    size: entity.size,
    stage: view.stage,
    duration: entity.duration
})
// =======
//     color: entity.color,
//     lane: mod(entity.lane + align(lane) - align(startLane), 8),
//     scaleL: entity.scaleL,
//     scaleR: entity.scaleR,
// })

// const toMovedDoubleHoldNoteJointObject = (
//     entities: Entity[],
//     entity: DoubleHoldNoteJointEntity,
//     startLane: number,
//     lane: number,
//     beat: number,
//     focus: Entity,
// ): DoubleHoldNoteJointObject => {
//     let focusL = Number.NEGATIVE_INFINITY
//     let focusR = Number.POSITIVE_INFINITY
//     if (
//         focus.type === 'doubleHoldNoteJoint' &&
//         entities.every((entity) => entity.type === 'doubleHoldNoteJoint')
//     ) {
//         focusL = Math.min(focus.laneL, focus.laneR)
//         focusR = Math.max(focus.laneL, focus.laneR)
//     }
//
//     const laneL = Math.min(entity.laneL, entity.laneR)
//     const laneR = Math.max(entity.laneL, entity.laneR)
//
//     if (startLane < focusL)
//         return {
//             beat: entity.beat,
//             color: entity.color,
//             laneL: mod(laneL + align(lane) - align(startLane), 8),
//             laneR,
//         }
//
//     if (startLane > focusR)
//         return {
//             beat: entity.beat,
//             color: entity.color,
//             laneL,
//             laneR: mod(laneR + align(lane) - align(startLane), 8),
//         }
//
//     return {
//         beat,
//         color: entity.color,
//         laneL: mod(laneL + align(lane) - align(startLane), 8),
//         laneR: mod(laneR + align(lane) - align(startLane), 8),
//     }
// }
// >>>>>>> upstream/main

type Create<T extends Entity> = (
    entities: Entity[],
    entity: T,
    startLane: number,
    lane: number,
    beat: number,
    focus: Entity,
) => Entity | undefined

const createValueEntity =
    <T extends ValueEntity>(toEntity: (object: ValueObject) => T): Create<T> =>
        (entities, entity, startLane, lane, beat) =>
            toEntity(toMovedValueObject(entity, beat))

const createStageValueEntity =
    <T extends TimeScaleEntity>(toEntity: (object: StageValueObject) => T): Create<T> =>
        (entities, entity, startLane, lane, beat) =>
            toEntity(toMovedStageValueObject(entity, beat))

const createEventJointEntity =
    <T extends EventJointEntityType>(
        type: T,
        laneToValue: (lane: number) => number,
        toEntity: (object: EventObject) => EntityOfType<T>,
    ): Create<EntityOfType<T>> =>
        (entities, entity, startLane, lane, beat) =>
            toEntity(toMovedEventObject(type, laneToValue, entities, entity, startLane, lane, beat))

const creates: {
    [T in Entity as T['type']]?: Create<T>
} = {
    bpm: createValueEntity(toBpmEntity),
    timeScale: createStageValueEntity(toTimeScaleEntity),

    rotateEventJoint: (entities, entity, startLane, lane, beat) =>
        toRotateEventJointEntity(toMovedRotateEventObject(entities, entity, startLane, lane, beat)),
    resizeEventJoint: createEventJointEntity(
        'resizeEventJoint',
        laneToResizeEventValue,
        toResizeEventJointEntity,
    ),
    transparentEventJoint: createEventJointEntity(
        'transparentEventJoint',
        laneToTransparentEventValue,
        toTransparentEventJointEntity,
    ),
    moveXEventJoint: createEventJointEntity(
        'moveXEventJoint',
        laneToMoveXEventValue,
        toMoveXEventJointEntity,
    ),
    moveYEventJoint: createEventJointEntity(
        'moveYEventJoint',
        laneToMoveYEventValue,
        toMoveYEventJointEntity,
    ),

    tapNote: (entities, entity, startLane, lane, beat) =>
        // <<<<<<< HEAD
        toTapNoteEntity(toMovedNoteObject(entity, startLane, lane, beat)),
    holdNote: (entities, entity, startLane, lane, beat) =>
        toHoldNoteEntity(toMovedHoldNoteObject(entity, startLane, lane, beat)),
    dragNote: (entities, entity, startLane, lane, beat) =>
        toDragNoteEntity(toMovedNoteObject(entity, startLane, lane, beat)),
    flickNote: (entities, entity, startLane, lane, beat) =>
        toFlickNoteEntity(toMovedNoteObject(entity, startLane, lane, beat)),
    // =======
    //     toTapNoteEntity(toMovedTapNoteObject(entity, startLane, lane, beat)),
    //
    //     singleHoldNoteJoint: (entities, entity, startLane, lane, beat) =>
    //         toSingleHoldNoteJointEntity(
    //             entity.id,
    //             toMovedSingleHoldNoteJointObject(entity, startLane, lane, beat),
    //         ),
    //             doubleHoldNoteJoint: (entities, entity, startLane, lane, beat, focus) =>
    //                 toDoubleHoldNoteJointEntity(
    //                     entity.id,
    //                     toMovedDoubleHoldNoteJointObject(entities, entity, startLane, lane, beat, focus),
    //                 ),
    // >>>>>>> upstream/main
}

type Move<T extends Entity> = (
    transaction: Transaction,
    entities: Entity[],
    entity: T,
    startLane: number,
    lane: number,
    beat: number,
    focus: Entity,
) => Entity[] | undefined

const moveValueEntity =
    <T extends ValueEntityType>(
        type: T,
        add: AddMutation<ValueObject>,
        remove: RemoveMutation<EntityOfType<T>>,
    ): Move<EntityOfType<T>> =>
        (transaction, entities, entity, startLane, lane, beat) => {
            const object = toMovedValueObject(entity, beat)

            if (entity.beat) remove(transaction, entity)

            const overlap = getInStoreGrid(transaction.store.grid, type, object.beat)?.find(
                (entity) => entity.beat === object.beat,
            )
            if (overlap) remove(transaction, overlap)

            return add(transaction, object)
        }

const moveStageValueEntity =
    <T extends "timeScale">(
        type: T,
        add: AddMutation<StageValueObject>,
        remove: RemoveMutation<EntityOfType<T>>,
    ): Move<EntityOfType<T>> =>
        (transaction, entities, entity, startLane, lane, beat) => {
            const object = toMovedStageValueObject(entity, beat)

            if (entity.beat) remove(transaction, entity)

            const overlap = getInStoreGrid(transaction.store.grid, type, object.beat)?.find(
                (entity) => entity.beat === object.beat && entity.stage === object.stage,
            )
            if (overlap) remove(transaction, overlap)

            return add(transaction, object)
        }

const moveEventJointEntity =
    <T extends EventJointEntityType>(
        type: T,
        laneToValue: (lane: number) => number,
        add: AddMutation<EventObject>,
        remove: RemoveMutation<EntityOfType<T>>,
    ): Move<EntityOfType<T>> =>
        (transaction, entities, entity, startLane, lane, beat) => {
            const object = toMovedEventObject(
                type,
                laneToValue,
                entities,
                entity,
                startLane,
                lane,
                beat,
            )

            remove(transaction, entity)

            const overlap = getInStoreGrid(transaction.store.grid, type, object.beat)?.find(
                (entity) => entity.beat === object.beat && entity.stage === object.stage,
            )
            if (overlap) remove(transaction, overlap)

            return add(transaction, object)
        }


type NoteEntity = "tapNote" | "dragNote" | "flickNote"

const moveNoteObject = <T extends NoteEntity>(type: T, addEntity: any, removeEntity: any): Move<EntityOfType<T>> => (transaction, entities, entity, startLane, lane, beat) => {
    const object = toMovedNoteObject(entity, startLane, lane, beat)

    removeEntity(transaction, entity)

    const overlap = getInStoreGrid(transaction.store.grid, type, object.beat)?.find(
        (entity) => entity.beat === object.beat && entity.lane === object.lane && entity.stage === object.stage,
    )
    if (overlap) removeEntity(transaction, overlap)

    return addEntity(transaction, object)
}
const moves: {
    [T in Entity as T['type']]?: Move<T>
} = {
    bpm: moveValueEntity('bpm', addBpm, removeBpm),
    timeScale: moveStageValueEntity('timeScale', addTimeScale, removeTimeScale),

    rotateEventJoint: (transaction, entities, entity, startLane, lane, beat) => {
        const object = toMovedRotateEventObject(entities, entity, startLane, lane, beat)

        removeRotateEventJoint(transaction, entity)

        const overlap = getInStoreGrid(
            transaction.store.grid,
            'rotateEventJoint',
            object.beat,
        )?.find((entity) => entity.beat === object.beat && entity.stage === object.stage)
        if (overlap) removeRotateEventJoint(transaction, overlap)

        return addRotateEventJoint(transaction, object)
    },
    resizeEventJoint: moveEventJointEntity(
        'resizeEventJoint',
        laneToResizeEventValue,
        addResizeEventJoint,
        removeResizeEventJoint,
    ),
    transparentEventJoint: moveEventJointEntity(
        'transparentEventJoint',
        laneToTransparentEventValue,
        addTransparentEventJoint,
        removeTransparentEventJoint,
    ),
    moveXEventJoint: moveEventJointEntity(
        'moveXEventJoint',
        laneToMoveXEventValue,
        addMoveXEventJoint,
        removeMoveXEventJoint,
    ),
    moveYEventJoint: moveEventJointEntity(
        'moveYEventJoint',
        laneToMoveYEventValue,
        addMoveYEventJoint,
        removeMoveYEventJoint,
    ),

    holdNote: (transaction, entities, entity, startLane, lane, beat) => {
        const object = toMovedHoldNoteObject(entity, startLane, lane, beat)

        removeHoldNote(transaction, entity)

        const overlap = getInStoreGrid(transaction.store.grid, 'holdNote', object.beat)?.find(
            (entity) => entity.beat === object.beat && entity.lane === object.lane && entity.stage === object.stage,
        )
        if (overlap) removeHoldNote(transaction, overlap)

        return addHoldNote(transaction, object)
    },

    // <<<<<<< HEAD
    tapNote: moveNoteObject("tapNote", addTapNote, removeTapNote),
    dragNote: moveNoteObject("dragNote", addDragNote, removeDragNote),
    flickNote: moveNoteObject("flickNote", addFlickNote, removeFlickNote),
    // =======
    //     singleHoldNoteJoint: (transaction, entities, entity, startLane, lane, beat) => {
    //         const object = toMovedSingleHoldNoteJointObject(entity, startLane, lane, beat)
    //
    //         removeSingleHoldNoteJoint(transaction, entity)
    //
    //         const overlap = getInStoreGrid(
    //             transaction.store.grid,
    //             'singleHoldNoteJoint',
    //             object.beat,
    //         )?.find((joint) => joint.id === entity.id && joint.beat === object.beat)
    //         if (overlap) removeSingleHoldNoteJoint(transaction, overlap)
    //
    //         return addSingleHoldNoteJoint(transaction, entity.id, object)
    //     },
    //     doubleHoldNoteJoint: (transaction, entities, entity, startLane, lane, beat, focus) => {
    //         const object = toMovedDoubleHoldNoteJointObject(
    //             entities,
    //             entity,
    //             startLane,
    //             lane,
    //             beat,
    //             focus,
    //         )
    //
    //         removeDoubleHoldNoteJoint(transaction, entity)
    //
    //         const overlap = getInStoreGrid(
    //             transaction.store.grid,
    //             'doubleHoldNoteJoint',
    //             object.beat,
    //         )?.find((joint) => joint.id === entity.id && joint.beat === object.beat)
    //         if (overlap) removeDoubleHoldNoteJoint(transaction, overlap)
    //
    //         return addDoubleHoldNoteJoint(transaction, entity.id, object)
    //     },
    // >>>>>>> upstream/main
}
