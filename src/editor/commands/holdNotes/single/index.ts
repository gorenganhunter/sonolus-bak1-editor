import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { notify } from '../../../notification'
import { switchToolTo } from '../../../tools'
import SingleHoldNoteIcon from './SingleHoldNoteIcon.vue'

export const singleHoldNote: Command = {
    title: () => i18n.value.commands.singleHoldNote.title,
    icon: {
        is: SingleHoldNoteIcon,
    },

    execute() {
        switchToolTo('singleHoldNote')

        notify(() => i18n.value.commands.singleHoldNote.switched)
    },
}
