import type { Command } from '..'
import type { ClipboardData } from '../../../clipboardData/schema'
import { pushState, replaceState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { i18n } from '../../../i18n'
import { serializeLevelDataEntities } from '../../../levelDataEntities/serialize'
import type { Entity, EntityOfType, EntityType } from '../../../state/entities'
import type { RemoveMutation } from '../../../state/mutations'
import { removeJudgeRotateEventJoint } from '../../../state/mutations/events/judgeRotate'
import { removeJudgeResizeEventJoint } from '../../../state/mutations/events/judgeResize'
import { removeJudgeMoveXEventJoint } from '../../../state/mutations/events/judgeMoveX'
import { removeJudgeMoveYEventJoint } from '../../../state/mutations/events/judgeMoveY'
import { removeSpawnRotateEventJoint } from '../../../state/mutations/events/spawnRotate'
import { removeSpawnResizeEventJoint } from '../../../state/mutations/events/spawnResize'
import { removeSpawnMoveXEventJoint } from '../../../state/mutations/events/spawnMoveX'
import { removeSpawnMoveYEventJoint } from '../../../state/mutations/events/spawnMoveY'
import { removeTransparentEventJoint } from '../../../state/mutations/events/transparent'
import { removeNoteHEventJoint } from '../../../state/mutations/events/noteH'
import { removeNote } from '../../../state/mutations/slides/note'
import { removeBpm } from '../../../state/mutations/values/bpm'
import { removeTimeScale } from '../../../state/mutations/values/timeScale'
import { createTransaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { view, xToLane, yToValidBeat } from '../../view'
import CutIcon from './CutIcon.vue'
import { stages } from '../../../history/stages'
import { createStore } from '../../../state/store/creates'
import { store } from '../../../history/store'

export const cut: Command = {
    title: () => i18n.value.commands.cut.title,
    icon: {
        is: CutIcon,
    },

    async execute() {
        const entities = selectedEntities.value

        if (!entities.length) {
            notify(() => i18n.value.commands.cut.noSelected)
            return
        }

        const data: ClipboardData = {
            lane: xToLane(view.pointer.x),
            beat: yToValidBeat(view.pointer.y),
            entities: serializeLevelDataEntities(
                createStore({
                    bpms: getEntities(entities, 'bpm'),
                    timeScales: getEntities(entities, 'timeScale'),

                    stages: stages.value,

                    slides: getSlides(entities),

                    judgeMoveXEvents: getEntities(entities, 'judgeMoveXEventJoint'),
                    judgeMoveYEvents: getEntities(entities, 'judgeMoveYEventJoint'),
                    judgeResizeEvents: getEntities(entities, 'judgeResizeEventJoint'),
                    judgeRotateEvents: getEntities(entities, 'judgeRotateEventJoint'),
                    spawnMoveXEvents: getEntities(entities, 'spawnMoveXEventJoint'),
                    spawnMoveYEvents: getEntities(entities, 'spawnMoveYEventJoint'),
                    spawnResizeEvents: getEntities(entities, 'spawnResizeEventJoint'),
                    spawnRotateEvents: getEntities(entities, 'spawnRotateEventJoint'),
                    transparentEvents: getEntities(entities, 'transparentEventJoint'),
                    noteHEvents: getEntities(entities, 'noteHEventJoint'),
                })
            ),
        }
        const text = JSON.stringify(data)

        await navigator.clipboard.writeText(text)

        const removeEntities = entities.filter(
            (entity) => canRemoves[entity.type]?.(entity as never) ?? true,
        )
        if (!removeEntities.length) {
            replaceState({
                ...state.value,
                selectedEntities: [],
            })
            view.entities = {
                hovered: [],
                creating: [],
            }
        } else {
            const transaction = createTransaction(state.value)

            for (const entity of removeEntities) {
                removes[entity.type]?.(transaction, entity as never)
            }

            pushState(
                interpolate(() => i18n.value.commands.cut.cut, `${entities.length}`),
                {
                    ...transaction.commit(),
                    selectedEntities: [],
                },
            )
            view.entities = {
                hovered: [],
                creating: [],
            }
        }

        notify(interpolate(() => i18n.value.commands.cut.cut, `${entities.length}`))
    },
}

const getEntities = <T extends EntityType>(entities: Entity[], type: T) =>
    entities.filter((entity): entity is EntityOfType<T> => entity.type === type)

const getSlides = (entities: Entity[]) => {
    const selectedNotes = entities.filter((entity) => entity.type === 'note')
    const selectedNotesSet = new Set(selectedNotes)

    return [...new Set(selectedNotes.map((note) => note.slideId))].map((slideId) => {
        const notes = store.value.slides.note.get(slideId)
        if (!notes) throw new Error('Unexpected notes not found')

        return notes.filter((note) => selectedNotesSet.has(note))
    })
}

const canRemoves: {
    [T in Entity as T['type']]?: (entity: T) => boolean
} = {
    bpm: (entity) => entity.beat > 0,
    timeScale: (entity) => entity.beat > 0,
}

const removes: {
    [T in Entity as T['type']]?: RemoveMutation<T>
} = {
    bpm: removeBpm,
    timeScale: removeTimeScale,

    judgeRotateEventJoint: removeJudgeRotateEventJoint,
    judgeResizeEventJoint: removeJudgeResizeEventJoint,
    judgeMoveXEventJoint: removeJudgeMoveXEventJoint,
    judgeMoveYEventJoint: removeJudgeMoveYEventJoint,
    spawnRotateEventJoint: removeSpawnRotateEventJoint,
    spawnResizeEventJoint: removeSpawnResizeEventJoint,
    spawnMoveXEventJoint: removeSpawnMoveXEventJoint,
    spawnMoveYEventJoint: removeSpawnMoveYEventJoint,
    transparentEventJoint: removeTransparentEventJoint,
    noteHEventJoint: removeNoteHEventJoint,

    note: removeNote
}
