import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultJudgeMoveYEventPropertiesModal from './DefaultJudgeMoveYEventPropertiesModal.vue'

export const judgeMoveYEvent: Command = {
    title: () => i18n.value.commands.judgeMoveYEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#5800db',
        },
    },

    execute() {
        if (toolName.value === 'judgeMoveYEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultJudgeMoveYEventPropertiesModal, {})
            }
        } else {
            switchToolTo('judgeMoveYEvent')

            notify(() => i18n.value.commands.judgeMoveYEvent.switched)
        }
    },
}
