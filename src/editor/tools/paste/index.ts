import { ref } from 'vue'
import type { Tool } from '..'
import type {
    EventObject,
    BaseNoteObject,
    ValueObject,
    StageValueObject,
    HoldNoteObject,
} from '../../../chart'
import { parseChart } from '../../../chart/parse'
import { parseClipboardData } from '../../../clipboardData/parse'
import { pushState, state } from '../../../history'
import { i18n } from '../../../i18n'
import type { Entity, EntityOfType } from '../../../state/entities'
import type { EventJointEntityType } from '../../../state/entities/events/joints'
import { laneToMoveXEventValue, toMoveXEventJointEntity } from '../../../state/entities/events/joints/moveX'
import { laneToMoveYEventValue, toMoveYEventJointEntity } from '../../../state/entities/events/joints/moveY'
import { laneToResizeEventValue, toResizeEventJointEntity } from '../../../state/entities/events/joints/resize'
import {
    toRotateEventJointEntity,
    type RotateEventJointEntity,
} from '../../../state/entities/events/joints/rotate'
import { laneToTransparentEventValue, toTransparentEventJointEntity } from '../../../state/entities/events/joints/transparent'
import { toDragNoteEntity, type DragNoteEntity } from '../../../state/entities/notes/dragNote'
import { toFlickNoteEntity, type FlickNoteEntity } from '../../../state/entities/notes/flickNote'
import { toHoldNoteEntity, type HoldNoteEntity } from '../../../state/entities/notes/holdNote'
import { toTapNoteEntity, type TapNoteEntity } from '../../../state/entities/notes/tapNote'
import type { ValueEntity, ValueEntityType } from '../../../state/entities/values'
import { toBpmEntity } from '../../../state/entities/values/bpm'
import { toTimeScaleEntity, type TimeScaleEntity } from '../../../state/entities/values/timeScale'
import type { AddMutation, RemoveMutation } from '../../../state/mutations'
import { addMoveXEventJoint, removeMoveXEventJoint } from '../../../state/mutations/events/moveX'
import { addMoveYEventJoint, removeMoveYEventJoint } from '../../../state/mutations/events/moveY'
import { addResizeEventJoint, removeResizeEventJoint } from '../../../state/mutations/events/resize'
import { addRotateEventJoint, removeRotateEventJoint } from '../../../state/mutations/events/rotate'
import { addTransparentEventJoint, removeTransparentEventJoint } from '../../../state/mutations/events/transparent'
import { addDragNote, removeDragNote } from '../../../state/mutations/notes/dragNote'
import { addFlickNote, removeFlickNote } from '../../../state/mutations/notes/flickNote'
import { addHoldNote, removeHoldNote } from '../../../state/mutations/notes/holdNote'
import { addTapNote, removeTapNote } from '../../../state/mutations/notes/tapNote'
import { addBpm, removeBpm } from '../../../state/mutations/values/bpm'
import { addTimeScale, removeTimeScale } from '../../../state/mutations/values/timeScale'
import { getInStoreGrid } from '../../../state/store/grid'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { align, clamp, mod } from '../../../utils/math'
import { timeout } from '../../../utils/promise'
import { notify } from '../../notification'
import { view, xToLane, yToValidBeat, yToBeatOffset } from '../../view'

// let text: string | undefined
// let data:
//     | {
// =======
// } from '../../../chart'
// import { parseChart } from '../../../chart/parse'
// import { parseClipboardData } from '../../../clipboardData/parse'
// import { pushState, state } from '../../../history'
// import { i18n } from '../../../i18n'
// import type { Entity, EntityOfType } from '../../../state/entities'
// import type { EventJointEntityType } from '../../../state/entities/events/joints'
// import {
//     toRotateEventJointEntity,
//     type RotateEventJointEntity,
// } from '../../../state/entities/events/joints/rotate'
// import {
//     laneToShiftEventValue,
//     toShiftEventJointEntity,
// } from '../../../state/entities/events/joints/shift'
// import {
//     laneToZoomEventValue,
//     toZoomEventJointEntity,
// } from '../../../state/entities/events/joints/zoom'
// import { createHoldNoteId } from '../../../state/entities/holdNotes'
// import {
//     toDoubleHoldNoteJointEntity,
//     type DoubleHoldNoteJointEntity,
// } from '../../../state/entities/holdNotes/joints/double'
// import {
//     toSingleHoldNoteJointEntity,
//     type SingleHoldNoteJointEntity,
// } from '../../../state/entities/holdNotes/joints/single'
// import { toTapNoteEntity, type TapNoteEntity } from '../../../state/entities/tapNote'
// import type { ValueEntity, ValueEntityType } from '../../../state/entities/values'
// import { toBpmEntity } from '../../../state/entities/values/bpm'
// import { toTimeScaleEntity } from '../../../state/entities/values/timeScale'
// import type { AddMutation, RemoveMutation } from '../../../state/mutations'
// import { addRotateEventJoint, removeRotateEventJoint } from '../../../state/mutations/events/rotate'
// import { addShiftEventJoint, removeShiftEventJoint } from '../../../state/mutations/events/shift'
// import { addZoomEventJoint, removeZoomEventJoint } from '../../../state/mutations/events/zoom'
// import { addDoubleHoldNoteJoint } from '../../../state/mutations/holdNotes/double'
// import { addSingleHoldNoteJoint } from '../../../state/mutations/holdNotes/single'
// import { addTapNote, removeTapNote } from '../../../state/mutations/tapNote'
// import { addBpm, removeBpm } from '../../../state/mutations/values/bpm'
// import { addTimeScale, removeTimeScale } from '../../../state/mutations/values/timeScale'
// import { getInStoreGrid } from '../../../state/store/grid'
// import { createTransaction, type Transaction } from '../../../state/transaction'
// import { interpolate } from '../../../utils/interpolate'
// import { align, clamp, mod } from '../../../utils/math'
// import { timeout } from '../../../utils/promise'
// import { notify } from '../../notification'
// import { view, xToLane, yToBeatOffset } from '../../view'
import PasteSidebar from './PasteSidebar.vue'
//
export type ClipboardEntry = {
    name: string
    text: string
    data?: {
        // >>>>>>> upstream/main:src/editor/tools/paste/index.ts
        lane: number
        beat: number
        entities: Entity[]
    }
    // <<<<<<< HEAD:src/editor/tools/paste.ts
    //     | undefined
    // =======
}

let i = 0
let clipboardEntry: ClipboardEntry | undefined
const clipboardEntries: ClipboardEntry[] = []

export const clipboardEntryNames = ref<string[]>([])
// >>>>>>> upstream/main:src/editor/tools/paste/index.ts

export const paste: Tool = {
    sidebar: PasteSidebar,

    async hover(x, y) {
        await updateClipboard()
        if (!clipboardEntry?.data?.entities.length) return

        const lane = xToLane(x)
        const beatOffset = yToBeatOffset(y, clipboardEntry.data.beat)

        const creating: Entity[] = []
        for (const entity of clipboardEntry.data.entities) {
            const beat = entity.beat + beatOffset
            if (beat < 0) continue

            const result = creates[entity.type]?.(
                clipboardEntry.data.entities,
                entity as never,
                clipboardEntry.data.lane,
                lane,
                beat,
            )
            if (!result) continue

            creating.push(result)
        }

        view.entities = {
            hovered: [],
            creating,
        }
    },

    async tap(x, y) {
        await updateClipboard()
        if (!clipboardEntry) return

        const data = getData(clipboardEntry.text)
        if (!data?.entities.length) return

        const transaction = createTransaction(state.value)

        const lane = xToLane(x)
        const beatOffset = yToBeatOffset(y, data.beat)

        const selectedEntities: Entity[] = []
        for (const entity of data.entities) {
            const beat = entity.beat + beatOffset
            if (beat < 0) continue

            const result = pastes[entity.type]?.(
                transaction,
                data.entities,
                entity as never,
                data.lane,
                lane,
                beat,
            )
            if (!result) continue

            selectedEntities.push(...result)
        }

        pushState(
            interpolate(() => i18n.value.tools.paste.pasted, `${selectedEntities.length}`),
            {
                ...transaction.commit(),
                selectedEntities,
            },
        )
        view.entities = {
            hovered: [],
            creating: [],
        }

        notify(interpolate(() => i18n.value.tools.paste.pasted, `${selectedEntities.length}`))
    },
}

export const updateClipboard = async () => {
    const text = await getText()
    if (!text) return
    if (clipboardEntry?.text === text) return

    clipboardEntry = clipboardEntries.find((entry) => entry.text === text)
    if (clipboardEntry) {
        clipboardEntries.splice(clipboardEntries.indexOf(clipboardEntry), 1)
        clipboardEntries.unshift(clipboardEntry)
        clipboardEntryNames.value = clipboardEntries.map(({ name }) => name)
        return
    }

    const data = getData(text)
    clipboardEntry = {
        name: data ? `#${++i} (${data.entities.length})` : '',
        text,
        data,
    }
    if (clipboardEntry.data) {
        clipboardEntries.unshift(clipboardEntry)
        if (clipboardEntries.length > 10) clipboardEntries.pop()
        clipboardEntryNames.value = clipboardEntries.map(({ name }) => name)
    }
}

const getText = async () => {
    try {
        return await Promise.race([navigator.clipboard.readText(), timeout(50)])
    } catch {
        return
    }
}

const getData = (text: string) => {
    try {
        const clipboardData = parseClipboardData(JSON.parse(text))
        const chart = parseChart(clipboardData.entities)

        return {
            lane: clipboardData.lane,
            beat: clipboardData.beat,
            entities: [
                ...chart.bpms.map(toBpmEntity),
                ...chart.timeScales.map(toTimeScaleEntity),

                ...chart.rotateEvents.map(toRotateEventJointEntity),
                ...chart.resizeEvents.map(toResizeEventJointEntity),
                ...chart.transparentEvents.map(toTransparentEventJointEntity),
                ...chart.moveXEvents.map(toMoveXEventJointEntity),
                ...chart.moveYEvents.map(toMoveYEventJointEntity),

                ...chart.tapNotes.map(toTapNoteEntity),
                ...chart.holdNotes.map(toHoldNoteEntity),
                ...chart.dragNotes.map(toDragNoteEntity),
                ...chart.flickNotes.map(toFlickNoteEntity),
            ],
        }
    } catch {
        return
    }
}

export const setToClipboardEntry = async (name: string) => {
    const entry = clipboardEntries.find((entry) => entry.name === name)
    if (!entry) return

    await navigator.clipboard.writeText(entry.text)
    await updateClipboard()
}

const toMovedValueObject = (entity: ValueEntity, beat: number): ValueObject => ({
    beat,
    value: entity.value,
})

const toMovedStageValueObject = (entity: TimeScaleEntity, beat: number): StageValueObject => ({
    beat,
    value: entity.value,
    stage: entity.stage
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
        : clamp(entity.value + align(laneToValue(lane), 10) - align(laneToValue(startLane), 10)),
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
            type === 'tapNote',
    )
        ? 1
        : 2

    return {
        beat,
        value: entity.value - align(lane, division) + align(startLane, division),
        ease: entity.ease,
        stage: view.stage
    }
}

type NoteEntity = TapNoteEntity | DragNoteEntity | FlickNoteEntity

const toMovedNoteObject = (
    entity: NoteEntity,
    startLane: number,
    lane: number,
    beat: number,
): BaseNoteObject => ({
    beat,
    lane: mod(mod(entity.lane + align(lane, view.lane) - align(startLane, view.lane), 1) + view.side, 4),
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
    lane: mod(mod(entity.lane + align(lane, view.lane) - align(startLane, view.lane), 1) + view.side, 4),
    size: entity.size,
    stage: view.stage,
    duration: entity.duration
})

type Create<T extends Entity> = (
    entities: Entity[],
    entity: T,
    startLane: number,
    lane: number,
    beat: number,
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
        toTapNoteEntity(toMovedNoteObject(entity, startLane, lane, beat)),
    dragNote: (entities, entity, startLane, lane, beat) =>
        toDragNoteEntity(toMovedNoteObject(entity, startLane, lane, beat)),
    flickNote: (entities, entity, startLane, lane, beat) =>
        toFlickNoteEntity(toMovedNoteObject(entity, startLane, lane, beat)),
    holdNote: (entities, entity, startLane, lane, beat) =>
        toHoldNoteEntity(toMovedHoldNoteObject(entity, startLane, lane, beat)),

}

type Paste<T extends Entity> = (
    transaction: Transaction,
    entities: Entity[],
    entity: T,
    startLane: number,
    lane: number,
    beat: number,
) => Entity[] | undefined

const moveValueEntity =
    <T extends ValueEntityType>(
        type: T,
        add: AddMutation<ValueObject>,
        remove: RemoveMutation<EntityOfType<T>>,
    ): Paste<EntityOfType<T>> =>
        (transaction, entities, entity, startLane, lane, beat) => {
            const object = toMovedValueObject(entity, beat)

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
    ): Paste<EntityOfType<T>> =>
        (transaction, entities, entity, startLane, lane, beat) => {
            const object = toMovedStageValueObject(entity, beat)

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
    ): Paste<EntityOfType<T>> =>
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

            const overlap = getInStoreGrid(transaction.store.grid, type, object.beat)?.find(
                (entity) => entity.beat === object.beat && entity.stage === object.stage,
            )
            if (overlap) remove(transaction, overlap)

            return add(transaction, object)
        }

type NoteEntityType = "tapNote" | "dragNote" | "flickNote"

const moveNoteObject = <T extends NoteEntityType>(type: T, addEntity: any, removeEntity: any): Paste<EntityOfType<T>> => (transaction, entities, entity, startLane, lane, beat) => {
    const object = toMovedNoteObject(entity, startLane, lane, beat)

    removeEntity(transaction, entity)

    const overlap = getInStoreGrid(transaction.store.grid, type, object.beat)?.find(
        (entity) => entity.beat === object.beat && entity.lane === object.lane && entity.stage === object.stage,
    )
    if (overlap) removeEntity(transaction, overlap)

    return addEntity(transaction, object)
}

const pastes: {
    [T in Entity as T['type']]?: Paste<T>
} = {
    bpm: moveValueEntity('bpm', addBpm, removeBpm),
    timeScale: moveStageValueEntity('timeScale', addTimeScale, removeTimeScale),

    rotateEventJoint: (transaction, entities, entity, startLane, lane, beat) => {
        const object = toMovedRotateEventObject(entities, entity, startLane, lane, beat)

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

    tapNote: moveNoteObject("tapNote", addTapNote, removeTapNote),
    dragNote: moveNoteObject("dragNote", addDragNote, removeDragNote),
    flickNote: moveNoteObject("flickNote", addFlickNote, removeFlickNote),
}
