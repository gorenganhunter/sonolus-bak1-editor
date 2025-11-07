import type { Command } from '..'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import { notify } from '../../notification'
import { focusSidebar, isSidebarVisible } from '../../sidebars'
import { switchToolTo, toolName } from '../../tools'
import DefaultFlickNotePropertiesModal from './DefaultFlickNotePropertiesModal.vue'
import FlickNoteIcon from './FlickNoteIcon.vue'

export const flickNote: Command = {
    title: () => i18n.value.commands.flickNote.title,
    icon: {
        is: FlickNoteIcon,
    },

    execute() {
        if (toolName.value === 'flickNote') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultFlickNotePropertiesModal, {})
            }
        } else {
            switchToolTo('flickNote')

            notify(() => i18n.value.commands.flickNote.switched)
        }
    },
}
