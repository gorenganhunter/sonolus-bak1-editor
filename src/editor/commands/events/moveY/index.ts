import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultMoveYEventPropertiesModal from './DefaultMoveYEventPropertiesModal.vue'

export const moveYEvent: Command = {
    title: () => i18n.value.commands.moveYEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#0ff',
        },
    },

    execute() {
        if (toolName.value === 'moveYEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultMoveYEventPropertiesModal, {})
            }
        } else {
            switchToolTo('moveYEvent')

            notify(() => i18n.value.commands.moveYEvent.switched)
        }
    },
}
