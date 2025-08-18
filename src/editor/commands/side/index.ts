import type { Command } from '..'
import { i18n } from '../../../i18n'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { view } from '../../view'
import TextIcon from '../TextIcon.vue'

export const side = (side: number): Command => ({
    title: interpolate(() => i18n.value.commands.lanes.title, `${side}`),
    icon: {
        is: TextIcon,
        props: {
            title: `${side}`,
        },
    },

    execute() {
        view.side = side

        notify(interpolate(() => i18n.value.commands.lanes.switched, `${side}`))
    },
})
