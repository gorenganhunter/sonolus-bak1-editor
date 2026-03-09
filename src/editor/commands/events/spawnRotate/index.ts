import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultSpawnRotateEventPropertiesModal from './DefaultSpawnRotateEventPropertiesModal.vue'

export const spawnRotateEvent: Command = {
    title: () => i18n.value.commands.spawnRotateEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#00db58',
        },
    },

    execute() {
        if (toolName.value === 'spawnRotateEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultSpawnRotateEventPropertiesModal, {})
            }
        } else {
            switchToolTo('spawnRotateEvent')

            notify(() => i18n.value.commands.spawnRotateEvent.switched)
        }
    },
}
