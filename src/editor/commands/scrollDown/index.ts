import type { Command } from '..'
import { i18n } from '../../../i18n'
import { scrollViewBy, view } from '../../view'
import ScrollDownIcon from './ScrollDownIcon.vue'

export const scrollDown: Command = {
    title: () => i18n.value.commands.scrollDown.title,
    icon: {
        is: ScrollDownIcon,
    },

    execute() {
        scrollViewBy(-view.h * 0.05, true)
    },
}
