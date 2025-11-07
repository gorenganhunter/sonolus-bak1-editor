import type { Command } from '..'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import { notify } from '../../notification'
import { focusSidebar, isSidebarVisible } from '../../sidebars'
import { switchToolTo, toolName } from '../../tools'
import DefaultDragNotePropertiesModal from './DefaultDragNotePropertiesModal.vue'
import DragNoteIcon from './DragNoteIcon.vue'

export const dragNote: Command = {
    title: () => i18n.value.commands.dragNote.title,
    icon: {
        is: DragNoteIcon,
    },

    execute() {
        if (toolName.value === 'dragNote') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultDragNotePropertiesModal, {})
            }
        } else {
            switchToolTo('dragNote')

            notify(() => i18n.value.commands.dragNote.switched)
        }
    },
}
