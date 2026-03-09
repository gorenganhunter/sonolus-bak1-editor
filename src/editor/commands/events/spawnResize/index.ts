import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultSpawnResizeEventPropertiesModal from './DefaultSpawnResizeEventPropertiesModal.vue'

export const spawnResizeEvent: Command = {
    title: () => i18n.value.commands.spawnResizeEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#dbdb00',
        },
    },

    execute() {
        if (toolName.value === 'spawnResizeEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultSpawnResizeEventPropertiesModal, {})
            }
        } else {
            switchToolTo('spawnResizeEvent')

            notify(() => i18n.value.commands.spawnResizeEvent.switched)
        }
    },
}
