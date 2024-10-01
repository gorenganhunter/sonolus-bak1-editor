import type { Command } from '..'
import { i18n } from '../../../i18n'
import { notify } from '../../notification'
import { switchToolTo } from '../../tools'
import EventIcon from './EventIcon.vue'

export const zoomEvent: Command = {
    title: () => i18n.value.commands.zoomEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#00f',
        },
    },

    execute() {
        switchToolTo('zoomEvent')

        notify(() => i18n.value.commands.zoomEvent.switched)
    },
}
