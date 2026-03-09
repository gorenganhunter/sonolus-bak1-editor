import { ref } from 'vue'
import type { Tool } from '..'
import type {
    EventObject,
    NoteObject,
    ValueObject,
    StageValueObject
} from '../../../chart'
import { parseChart } from '../../../chart/parse'
import { parseClipboardData } from '../../../clipboardData/parse'
import { pushState, state } from '../../../history'
import { i18n } from '../../../i18n'
import type { Entity, EntityOfType } from '../../../state/entities'
import type { EventJointEntityType } from '../../../state/entities/events/joints'
import { laneToJudgeMoveXEventValue, toJudgeMoveXEventJointEntity } from '../../../state/entities/events/joints/judgeMoveX'
import { laneToJudgeMoveYEventValue, toJudgeMoveYEventJointEntity } from '../../../state/entities/events/joints/judgeMoveY'
import { laneToJudgeResizeEventValue, toJudgeResizeEventJointEntity } from '../../../state/entities/events/joints/judgeResize'
import {
    toJudgeRotateEventJointEntity,
    type JudgeRotateEventJointEntity,
} from '../../../state/entities/events/joints/judgeRotate'
import { laneToSpawnMoveXEventValue, toSpawnMoveXEventJointEntity } from '../../../state/entities/events/joints/spawnMoveX'
import { laneToSpawnMoveYEventValue, toSpawnMoveYEventJointEntity } from '../../../state/entities/events/joints/spawnMoveY'
import { laneToSpawnResizeEventValue, toSpawnResizeEventJointEntity } from '../../../state/entities/events/joints/spawnResize'
import {
    toSpawnRotateEventJointEntity,
    type SpawnRotateEventJointEntity,
} from '../../../state/entities/events/joints/spawnRotate'
import { laneToTransparentEventValue, toTransparentEventJointEntity } from '../../../state/entities/events/joints/transparent'
import { laneToNoteHEventValue, toNoteHEventJointEntity } from '../../../state/entities/events/joints/noteH'
import type { ValueEntity, ValueEntityType } from '../../../state/entities/values'
import { toBpmEntity } from '../../../state/entities/values/bpm'
import { toTimeScaleEntity, type TimeScaleEntity } from '../../../state/entities/values/timeScale'
import type { AddMutation, RemoveMutation } from '../../../state/mutations'
import { addJudgeMoveXEventJoint, removeJudgeMoveXEventJoint } from '../../../state/mutations/events/judgeMoveX'
import { addJudgeMoveYEventJoint, removeJudgeMoveYEventJoint } from '../../../state/mutations/events/judgeMoveY'
import { addJudgeResizeEventJoint, removeJudgeResizeEventJoint } from '../../../state/mutations/events/judgeResize'
import { addJudgeRotateEventJoint, removeJudgeRotateEventJoint } from '../../../state/mutations/events/judgeRotate'
import { addSpawnMoveXEventJoint, removeSpawnMoveXEventJoint } from '../../../state/mutations/events/spawnMoveX'
import { addSpawnMoveYEventJoint, removeSpawnMoveYEventJoint } from '../../../state/mutations/events/spawnMoveY'
import { addSpawnResizeEventJoint, removeSpawnResizeEventJoint } from '../../../state/mutations/events/spawnResize'
import { addSpawnRotateEventJoint, removeSpawnRotateEventJoint } from '../../../state/mutations/events/spawnRotate'
import { addTransparentEventJoint, removeTransparentEventJoint } from '../../../state/mutations/events/transparent'
import { addNoteHEventJoint, removeNoteHEventJoint } from '../../../state/mutations/events/noteH'
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
import { toNoteEntity, type NoteEntity } from '../../../state/entities/slides/note'
import { createSlideId } from '../../../state/entities/slides'
import { addNote, removeNote, replaceNote } from '../../../state/mutations/slides/note'
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
                ...transaction.commit(selectedEntities),
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

                ...chart.judgeRotateEvents.map(toJudgeRotateEventJointEntity),
                ...chart.judgeResizeEvents.map(toJudgeResizeEventJointEntity),
                ...chart.judgeMoveXEvents.map(toJudgeMoveXEventJointEntity),
                ...chart.judgeMoveYEvents.map(toJudgeMoveYEventJointEntity),
                ...chart.spawnRotateEvents.map(toSpawnRotateEventJointEntity),
                ...chart.spawnResizeEvents.map(toSpawnResizeEventJointEntity),
                ...chart.spawnMoveXEvents.map(toSpawnMoveXEventJointEntity),
                ...chart.spawnMoveYEvents.map(toSpawnMoveYEventJointEntity),
                ...chart.transparentEvents.map(toTransparentEventJointEntity),
                ...chart.noteHEvents.map(toNoteHEventJointEntity),

                ...chart.slides.flatMap((slide) => {
                    const slideId = createSlideId()

                    return slide.map((note) => toNoteEntity(slideId, note))
                }),
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
        : clamp(entity.value + align(laneToValue(lane), 10) - align(laneToValue(startLane), 10)),
    ease: entity.ease,
    stage: view.stage
})

const toMovedRotateEventObject = (
    entities: Entity[],
    entity: JudgeRotateEventJointEntity | SpawnRotateEventJointEntity,
    startLane: number,
    lane: number,
    beat: number,
): EventObject => {
    const division = entities.some(
        ({ type }) =>
            type === 'note',
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

const toMovedNoteObject = (
    entities: Entity[],
    entity: NoteEntity,
    startLane: number,
    lane: number,
    beat: number,
    focus?: Entity,
): NoteObject => {
    // if (focus.type === 'note' && entities.every((entity) => entity.type === 'note')) {
    //     //console.log(startLane, focus.lane, focus.size, view.laneDiv)
    //     if (startLane <= focus.lane - focus.size / 2 + 1 / view.laneDiv / 4) {
    //         const a = entity.lane + entity.size / 2 - 1 / view.laneDiv
    //         const b = entity.lane - entity.size / 2 + (laneToValidLane(lane) - laneToValidLane(startLane))
    //
    //         return {
    //             ...entity,
    //             lane: (a + b + 1 / view.laneDiv) / 2,
    //             size: Math.abs(a - b) + 1 / view.laneDiv,
    //         }
    //     } else if (startLane >= focus.lane + focus.size / 2 - 1 / view.laneDiv / 4) {
    //         const a = entity.lane - entity.size / 2
    //         const b =
    //             entity.lane + entity.size / 2 - 1 / view.laneDiv + (laneToValidLane(lane) - laneToValidLane(startLane))
    //
    //         return {
    //             ...entity,
    //             lane: (a + b + 1 / view.laneDiv) / 2,
    //             size: Math.abs(a - b) + 1 / view.laneDiv,
    //         }
    //     }
    // }

    return {
        ...entity,
        beat,
        lane: entity.lane + align(lane, view.laneDiv) - align(startLane, view.laneDiv),
        stage: view.stage
    }
}

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

    judgeRotateEventJoint: (entities, entity, startLane, lane, beat) =>
        toJudgeRotateEventJointEntity(toMovedRotateEventObject(entities, entity, startLane, lane, beat)),
    judgeResizeEventJoint: createEventJointEntity(
        'judgeResizeEventJoint',
        laneToJudgeResizeEventValue,
        toJudgeResizeEventJointEntity,
    ),
    judgeMoveXEventJoint: createEventJointEntity(
        'judgeMoveXEventJoint',
        laneToJudgeMoveXEventValue,
        toJudgeMoveXEventJointEntity,
    ),
    judgeMoveYEventJoint: createEventJointEntity(
        'judgeMoveYEventJoint',
        laneToJudgeMoveYEventValue,
        toJudgeMoveYEventJointEntity,
    ),
    spawnRotateEventJoint: (entities, entity, startLane, lane, beat) =>
        toSpawnRotateEventJointEntity(toMovedRotateEventObject(entities, entity, startLane, lane, beat)),
    spawnResizeEventJoint: createEventJointEntity(
        'spawnResizeEventJoint',
        laneToSpawnResizeEventValue,
        toSpawnResizeEventJointEntity,
    ),
    spawnMoveXEventJoint: createEventJointEntity(
        'spawnMoveXEventJoint',
        laneToSpawnMoveXEventValue,
        toSpawnMoveXEventJointEntity,
    ),
    spawnMoveYEventJoint: createEventJointEntity(
        'spawnMoveYEventJoint',
        laneToSpawnMoveYEventValue,
        toSpawnMoveYEventJointEntity,
    ),
    transparentEventJoint: createEventJointEntity(
        'transparentEventJoint',
        laneToTransparentEventValue,
        toTransparentEventJointEntity,
    ),
    noteHEventJoint: createEventJointEntity(
        'noteHEventJoint',
        laneToNoteHEventValue,
        toNoteHEventJointEntity,
    ),

    note: (entities, entity, startLane, lane, beat) =>
        toNoteEntity(entity.slideId, toMovedNoteObject(entities, entity, startLane, lane, beat)),
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

// const moveNoteObject = (addEntity: any, removeEntity: any): Paste<NoteEntity> => (transaction, entities, entity, startLane, lane, beat) => {
//     const object = toMovedNoteObject(entity, startLane, lane, beat)
//
//     removeEntity(transaction, entity)
//
//     const overlap = getInStoreGrid(transaction.store.grid, "note", object.beat)?.find(
//         (entity) => entity.beat === object.beat && entity.lane === object.lane && entity.stage === object.stage,
//     )
//     if (overlap) removeEntity(transaction, overlap)
//
//     return addEntity(transaction, object)
// }

const pastes: {
    [T in Entity as T['type']]?: Paste<T>
} = {
    bpm: moveValueEntity('bpm', addBpm, removeBpm),
    timeScale: moveStageValueEntity('timeScale', addTimeScale, removeTimeScale),

    judgeRotateEventJoint: (transaction, entities, entity, startLane, lane, beat) => {
        const object = toMovedRotateEventObject(entities, entity, startLane, lane, beat)

        const overlap = getInStoreGrid(
            transaction.store.grid,
            'judgeRotateEventJoint',
            object.beat,
        )?.find((entity) => entity.beat === object.beat && entity.stage === object.stage)
        if (overlap) removeJudgeRotateEventJoint(transaction, overlap)

        return addJudgeRotateEventJoint(transaction, object)
    },
    judgeResizeEventJoint: moveEventJointEntity(
        'judgeResizeEventJoint',
        laneToJudgeResizeEventValue,
        addJudgeResizeEventJoint,
        removeJudgeResizeEventJoint,
    ),
    judgeMoveXEventJoint: moveEventJointEntity(
        'judgeMoveXEventJoint',
        laneToJudgeMoveXEventValue,
        addJudgeMoveXEventJoint,
        removeJudgeMoveXEventJoint,
    ),
    judgeMoveYEventJoint: moveEventJointEntity(
        'judgeMoveYEventJoint',
        laneToJudgeMoveYEventValue,
        addJudgeMoveYEventJoint,
        removeJudgeMoveYEventJoint,
    ),
    spawnRotateEventJoint: (transaction, entities, entity, startLane, lane, beat) => {
        const object = toMovedRotateEventObject(entities, entity, startLane, lane, beat)

        const overlap = getInStoreGrid(
            transaction.store.grid,
            'spawnRotateEventJoint',
            object.beat,
        )?.find((entity) => entity.beat === object.beat && entity.stage === object.stage)
        if (overlap) removeSpawnRotateEventJoint(transaction, overlap)

        return addSpawnRotateEventJoint(transaction, object)
    },
    spawnResizeEventJoint: moveEventJointEntity(
        'spawnResizeEventJoint',
        laneToSpawnResizeEventValue,
        addSpawnResizeEventJoint,
        removeSpawnResizeEventJoint,
    ),
    spawnMoveXEventJoint: moveEventJointEntity(
        'spawnMoveXEventJoint',
        laneToSpawnMoveXEventValue,
        addSpawnMoveXEventJoint,
        removeSpawnMoveXEventJoint,
    ),
    spawnMoveYEventJoint: moveEventJointEntity(
        'spawnMoveYEventJoint',
        laneToSpawnMoveYEventValue,
        addSpawnMoveYEventJoint,
        removeSpawnMoveYEventJoint,
    ),
    transparentEventJoint: moveEventJointEntity(
        'transparentEventJoint',
        laneToTransparentEventValue,
        addTransparentEventJoint,
        removeTransparentEventJoint,
    ),
    noteHEventJoint: moveEventJointEntity(
        'noteHEventJoint',
        laneToNoteHEventValue,
        addNoteHEventJoint,
        removeNoteHEventJoint,
    ),

    note: (transaction, entities, entity, startLane, lane, beat) => {
        const object = toMovedNoteObject(entities, entity, startLane, lane, beat)

        return addNote(transaction, entity.slideId, object)
    },
}
