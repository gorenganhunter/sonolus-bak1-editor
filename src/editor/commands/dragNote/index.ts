import type { Command } from '..'
import { i18n } from '../../../i18n'
import { notify } from '../../notification'
import { switchToolTo } from '../../tools'
import DragNoteIcon from './DragNoteIcon.vue'

export const dragNote: Command = {
    title: () => i18n.value.commands.dragNote.title,
    icon: {
        is: DragNoteIcon,
    },

    execute() {
        switchToolTo('dragNote')

        notify(() => i18n.value.commands.dragNote.switched)
    },
}
