import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultJudgeMoveXEventPropertiesModal from './DefaultJudgeMoveXEventPropertiesModal.vue'

export const judgeMoveXEvent: Command = {
    title: () => i18n.value.commands.judgeMoveXEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#db00db',
        },
    },

    execute() {
        if (toolName.value === 'judgeMoveXEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultJudgeMoveXEventPropertiesModal, {})
            }
        } else {
            switchToolTo('judgeMoveXEvent')

            notify(() => i18n.value.commands.judgeMoveXEvent.switched)
        }
    },
}
