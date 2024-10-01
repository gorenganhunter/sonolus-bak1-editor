import type { Command } from '..'
import { i18n } from '../../../i18n'
import { notify } from '../../notification'
import { switchToolTo } from '../../tools'
import TapNoteIcon from './TapNoteIcon.vue'

export const tapNote: Command = {
    title: () => i18n.value.commands.tapNote.title,
    icon: {
        is: TapNoteIcon,
    },

    execute() {
        switchToolTo('tapNote')

        notify(() => i18n.value.commands.tapNote.switched)
    },
}
