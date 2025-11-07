import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultTransparentEventPropertiesModal from './DefaultTransparentEventPropertiesModal.vue'

export const transparentEvent: Command = {
    title: () => i18n.value.commands.transparentEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#00f',
        },
    },

    execute() {
        if (toolName.value === 'transparentEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultTransparentEventPropertiesModal, {})
            }
        } else {
            switchToolTo('transparentEvent')

            notify(() => i18n.value.commands.transparentEvent.switched)
        }
    },
}
