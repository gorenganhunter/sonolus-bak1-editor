import type { Command } from '..'
import { i18n } from '../../../i18n'
import { notify } from '../../notification'
import { switchToolTo } from '../../tools'
import EventIcon from './EventIcon.vue'

export const shiftEvent: Command = {
    title: () => i18n.value.commands.shiftEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#f00',
        },
    },

    execute() {
        switchToolTo('shiftEvent')

        notify(() => i18n.value.commands.shiftEvent.switched)
    },
}
