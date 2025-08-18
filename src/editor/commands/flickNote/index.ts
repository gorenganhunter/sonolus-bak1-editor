import type { Command } from '..'
import { i18n } from '../../../i18n'
import { notify } from '../../notification'
import { switchToolTo } from '../../tools'
import FlickNoteIcon from './FlickNoteIcon.vue'

export const flickNote: Command = {
    title: () => i18n.value.commands.flickNote.title,
    icon: {
        is: FlickNoteIcon,
    },

    execute() {
        switchToolTo('flickNote')

        notify(() => i18n.value.commands.flickNote.switched)
    },
}
