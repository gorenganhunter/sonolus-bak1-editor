import type { Command } from '..'
import { i18n } from '../../../i18n'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { defaultNoteProperties } from '../../tools/note'
import { view } from '../../view'
import TextIcon from '../TextIcon.vue'

export const lane = (lane: number): Command => ({
    title: interpolate(() => i18n.value.commands.lanes.title, `${lane}`),
    icon: {
        is: TextIcon,
        props: {
            title: `${lane}k`,
        },
    },

    execute() {
        view.laneDiv = lane
        defaultNoteProperties.value.size = 1 / lane

        notify(interpolate(() => i18n.value.commands.lanes.switched, `${lane}`))
    },
})
