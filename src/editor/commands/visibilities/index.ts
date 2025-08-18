import type { Command } from '..'
import { i18n } from '../../../i18n'
import type { EntityType } from '../../../state/entities'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { view } from '../../view'
import VisibilityIcon from './VisibilityIcon.vue'

export const visibilityTypes = {
    tapNote: ['tapNote'],
    dragNote: ['dragNote'],
    flickNote: ['flickNote'],
    holdNote: ['holdNote'],
    // singleHoldNote: ['singleHoldNoteJoint', 'singleHoldNoteConnection'],
    // doubleHoldNote: ['doubleHoldNoteJoint', 'doubleHoldNoteConnection'],
    rotateEvent: ['rotateEventJoint', 'rotateEventConnection'],
    resizeEvent: ['resizeEventJoint', 'resizeEventConnection'],
    transparentEvent: ['transparentEventJoint', 'transparentEventConnection'],
    moveXEvent: ['moveXEventJoint', 'moveXEventConnection'],
    moveYEvent: ['moveYEventJoint', 'moveYEventConnection'],
    // shiftEvent: ['shiftEventJoint', 'shiftEventConnection'],
    // zoomEvent: ['zoomEventJoint', 'zoomEventConnection'],
    timeScale: ['timeScale'],
    bpm: ['bpm'],
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
