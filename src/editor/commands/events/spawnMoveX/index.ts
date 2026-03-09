import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultSpawnMoveXEventPropertiesModal from './DefaultSpawnMoveXEventPropertiesModal.vue'

export const spawnMoveXEvent: Command = {
    title: () => i18n.value.commands.spawnMoveXEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#db0000',
        },
    },

    execute() {
        if (toolName.value === 'spawnMoveXEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultSpawnMoveXEventPropertiesModal, {})
            }
        } else {
            switchToolTo('spawnMoveXEvent')

            notify(() => i18n.value.commands.spawnMoveXEvent.switched)
        }
    },
}
