import type { Command } from '..'
import type { ClipboardData } from '../../../clipboardData/schema'
import { selectedEntities } from '../../../history/selectedEntities'
import { stages } from '../../../history/stages'
import { store } from '../../../history/store'
import { i18n } from '../../../i18n'
import { serializeLevelDataEntities } from '../../../levelDataEntities/serialize'
import type { Entity, EntityOfType, EntityType } from '../../../state/entities'
import { createStore } from '../../../state/store/creates'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { hitAllEntitiesAtPoint } from '../../tools/utils'
import { view, xToLane, yToValidBeat } from '../../view'
import CopyIcon from './CopyIcon.vue'

export const copy: Command = {
    title: () => i18n.value.commands.copy.title,
    icon: {
        is: CopyIcon,
    },

    async execute() {
        const entities = selectedEntities.value

        if (!entities.length) {
            notify(() => i18n.value.commands.copy.noSelected)
            return
        }

        const [entity] = hitAllEntitiesAtPoint(view.pointer.x, view.pointer.y).filter((entity) =>
            entities.includes(entity),
        )

        const data: ClipboardData = {
            lane: xToLane(view.pointer.x),
            beat: entity?.beat ?? yToValidBeat(view.pointer.y),
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

        notify(interpolate(() => i18n.value.commands.copy.copied, `${entities.length}`))
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
