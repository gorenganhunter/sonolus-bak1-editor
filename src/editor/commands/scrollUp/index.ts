import type { Command } from '..'
import { i18n } from '../../../i18n'
import { scrollViewBy, view } from '../../view'
import ScrollUpIcon from './ScrollUpIcon.vue'

export const scrollUp: Command = {
    title: () => i18n.value.commands.scrollUp.title,
    icon: {
        is: ScrollUpIcon,
    },

    execute() {
        scrollViewBy(view.h * 0.05, true)
    },
}
