import type { Command } from '..'
import { i18n } from '../../../i18n'
import type { EntityType } from '../../../state/entities'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { view } from '../../view'
import VisibilityIcon from './VisibilityIcon.vue'

export const visibilityTypes = {
    // singleHoldNote: ['singleHoldNoteJoint', 'singleHoldNoteConnection'],
    // doubleHoldNote: ['doubleHoldNoteJoint', 'doubleHoldNoteConnection'],
    judgeRotateEvent: ['judgeRotateEventJoint', 'judgeRotateEventConnection'],
    judgeResizeEvent: ['judgeResizeEventJoint', 'judgeResizeEventConnection'],
    judgeMoveXEvent: ['judgeMoveXEventJoint', 'judgeMoveXEventConnection'],
    judgeMoveYEvent: ['judgeMoveYEventJoint', 'judgeMoveYEventConnection'],
    spawnRotateEvent: ['spawnRotateEventJoint', 'spawnRotateEventConnection'],
    spawnResizeEvent: ['spawnResizeEventJoint', 'spawnResizeEventConnection'],
    spawnMoveXEvent: ['spawnMoveXEventJoint', 'spawnMoveXEventConnection'],
    spawnMoveYEvent: ['spawnMoveYEventJoint', 'spawnMoveYEventConnection'],
    transparentEvent: ['transparentEventJoint', 'transparentEventConnection'],
    noteHEvent: ['noteHEventJoint', 'noteHEventConnection'],
    // shiftEvent: ['shiftEventJoint', 'shiftEventConnection'],
    // zoomEvent: ['zoomEventJoint', 'zoomEventConnection'],
    timeScale: ['timeScale'],
    bpm: ['bpm'],
    note: ['note', 'connector']
} satisfies Record<string, EntityType[]>

export const createVisibility = (key: keyof typeof visibilityTypes, props: object): Command => ({
    title: interpolate(
        () => i18n.value.commands.visibilities.toggle.title,
        () => i18n.value.commands.visibilities.toggle.types[key],
    ),
    icon: {
        is: VisibilityIcon,
        props,
    },

    execute() {
        const visibilities = { ...view.visibilities }

        const isVisible = visibilityTypes[key].some((type) => !visibilities[type])
        for (const type of visibilityTypes[key]) {
            visibilities[type] = isVisible
        }

        view.visibilities = visibilities

        notify(
            interpolate(
                () => i18n.value.commands.visibilities.toggle.toggled,
                () => i18n.value.commands.visibilities.toggle.types[key],
            ),
        )
    },
})
