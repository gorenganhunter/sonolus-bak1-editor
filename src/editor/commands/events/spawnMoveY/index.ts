import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultSpawnMoveYEventPropertiesModal from './DefaultSpawnMoveYEventPropertiesModal.vue'

export const spawnMoveYEvent: Command = {
    title: () => i18n.value.commands.spawnMoveYEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#db6e00',
        },
    },

    execute() {
        if (toolName.value === 'spawnMoveYEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultSpawnMoveYEventPropertiesModal, {})
            }
        } else {
            switchToolTo('spawnMoveYEvent')

            notify(() => i18n.value.commands.spawnMoveYEvent.switched)
        }
    },
}
