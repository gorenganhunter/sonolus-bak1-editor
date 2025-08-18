import type { Command } from '..'
import { i18n } from '../../../i18n'
import { notify } from '../../notification'
import { switchToolTo } from '../../tools'
import EventIcon from './EventIcon.vue'

export const moveXEvent: Command = {
    title: () => i18n.value.commands.moveXEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#ff0',
        },
    },

    execute() {
        switchToolTo('moveXEvent')

        notify(() => i18n.value.commands.moveXEvent.switched)
    },
}
