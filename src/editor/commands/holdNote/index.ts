import type { Command } from '..'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import { notify } from '../../notification'
import { focusSidebar, isSidebarVisible } from '../../sidebars'
import { switchToolTo, toolName } from '../../tools'
import DefaultHoldNotePropertiesModal from './DefaultHoldNotePropertiesModal.vue'
import HoldNoteIcon from './HoldNoteIcon.vue'

export const holdNote: Command = {
    title: () => i18n.value.commands.holdNote.title,
    icon: {
        is: HoldNoteIcon,
    },

    execute() {
        if (toolName.value === 'holdNote') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultHoldNotePropertiesModal, {})
            }
        } else {
            switchToolTo('holdNote')

            notify(() => i18n.value.commands.holdNote.switched)
        }
    },
}
