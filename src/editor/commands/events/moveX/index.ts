import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultMoveXEventPropertiesModal from './DefaultMoveXEventPropertiesModal.vue'

export const moveXEvent: Command = {
    title: () => i18n.value.commands.moveXEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#ff0',
        },
    },

    execute() {
        if (toolName.value === 'moveXEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultMoveXEventPropertiesModal, {})
            }
        } else {
            switchToolTo('moveXEvent')

            notify(() => i18n.value.commands.moveXEvent.switched)
        }
    },
}
