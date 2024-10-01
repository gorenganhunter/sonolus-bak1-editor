import type { Command } from '..'
import { i18n } from '../../../i18n'
import { scrollViewBy, view } from '../../view'
import ScrollPageUpIcon from './ScrollPageUpIcon.vue'

export const scrollPageUp: Command = {
    title: () => i18n.value.commands.scrollPageUp.title,
    icon: {
        is: ScrollPageUpIcon,
    },

    execute() {
        scrollViewBy(view.h, true)
    },
}
