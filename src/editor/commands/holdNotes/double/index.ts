import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { notify } from '../../../notification'
import { switchToolTo } from '../../../tools'
import DoubleHoldNoteIcon from './DoubleHoldNoteIcon.vue'

export const doubleHoldNote: Command = {
    title: () => i18n.value.commands.doubleHoldNote.title,
    icon: {
        is: DoubleHoldNoteIcon,
    },

    execute() {
        switchToolTo('doubleHoldNote')

        notify(() => i18n.value.commands.doubleHoldNote.switched)
    },
}
