import type { Command } from '..'
import { i18n } from '../../../i18n'
import { scrollViewBy, view } from '../../view'
import ScrollPageDownIcon from './ScrollPageDownIcon.vue'

export const scrollPageDown: Command = {
    title: () => i18n.value.commands.scrollPageDown.title,
    icon: {
        is: ScrollPageDownIcon,
    },

    execute() {
        scrollViewBy(-view.h, true)
    },
}
