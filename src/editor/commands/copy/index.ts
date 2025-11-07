import type { Command } from '..'
import type { ClipboardData } from '../../../clipboardData/schema'
import { selectedEntities } from '../../../history/selectedEntities'
import { i18n } from '../../../i18n'
import { serializeLevelDataEntities } from '../../../levelDataEntities/serialize'
import type { Entity, EntityOfType, EntityType } from '../../../state/entities'
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

        notify(interpolate(() => i18n.value.commands.copy.copied, `${entities.length}`))
    },
}

const getEntities = <T extends EntityType>(entities: Entity[], type: T) =>
    entities.filter((entity): entity is EntityOfType<T> => entity.type === type)
