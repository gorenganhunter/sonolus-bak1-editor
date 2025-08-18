import type { Command } from '..'
import { i18n } from '../../../i18n'
import { notify } from '../../notification'
import { switchToolTo } from '../../tools'
import HoldNoteIcon from './HoldNoteIcon.vue'

export const holdNote: Command = {
    title: () => i18n.value.commands.holdNote.title,
    icon: {
        is: HoldNoteIcon,
    },

    execute() {
        switchToolTo('holdNote')

        notify(() => i18n.value.commands.holdNote.switched)
    },
}
