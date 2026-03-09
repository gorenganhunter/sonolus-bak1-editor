import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultNoteHEventPropertiesModal from './DefaultNoteHEventPropertiesModal.vue'

export const noteHEvent: Command = {
    title: () => i18n.value.commands.noteHEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#00dbdb',
        },
    },

    execute() {
        if (toolName.value === 'noteHEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultNoteHEventPropertiesModal, {})
            }
        } else {
            switchToolTo('noteHEvent')

            notify(() => i18n.value.commands.noteHEvent.switched)
        }
    },
}
