import type { Command } from '..'
import type { ClipboardData } from '../../../clipboardData/schema'
import { pushState, replaceState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { i18n } from '../../../i18n'
import { serializeLevelDataEntities } from '../../../levelDataEntities/serialize'
import type { Entity, EntityOfType, EntityType } from '../../../state/entities'
import type { RemoveMutation } from '../../../state/mutations'
import { removeRotateEventJoint } from '../../../state/mutations/events/rotate'
import { removeTapNote } from '../../../state/mutations/notes/tapNote'
import { removeHoldNote } from '../../../state/mutations/notes/holdNote'
import { removeDragNote } from '../../../state/mutations/notes/dragNote'
import { removeFlickNote } from '../../../state/mutations/notes/flickNote'
import { removeBpm } from '../../../state/mutations/values/bpm'
import { removeTimeScale } from '../../../state/mutations/values/timeScale'
import { createTransaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { view, xToLane, yToValidBeat } from '../../view'
import CutIcon from './CutIcon.vue'

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
                [],
                getEntities(entities, 'bpm'),
                getEntities(entities, 'timeScale'),
                getEntities(entities, 'rotateEventJoint'),
                [],
                getEntities(entities, 'resizeEventJoint'),
                [],
                getEntities(entities, 'transparentEventJoint'),
                [],
                getEntities(entities, 'moveXEventJoint'),
                [],
                getEntities(entities, 'moveYEventJoint'),
                [],

                getEntities(entities, 'tapNote'),
                getEntities(entities, 'holdNote'),
                getEntities(entities, 'dragNote'),
                getEntities(entities, 'flickNote'),
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

    rotateEventJoint: removeRotateEventJoint,

    tapNote: removeTapNote,
    holdNote: removeHoldNote,
    dragNote: removeDragNote,
    flickNote: removeFlickNote,
}
