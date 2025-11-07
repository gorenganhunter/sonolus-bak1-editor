import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultResizeEventPropertiesModal from './DefaultResizeEventPropertiesModal.vue'

export const resizeEvent: Command = {
    title: () => i18n.value.commands.resizeEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#f00',
        },
    },

    execute() {
        if (toolName.value === 'resizeEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultResizeEventPropertiesModal, {})
            }
        } else {
            switchToolTo('resizeEvent')

            notify(() => i18n.value.commands.resizeEvent.switched)
        }
    },
}
