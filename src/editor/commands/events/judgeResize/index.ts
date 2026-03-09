import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultJudgeResizeEventPropertiesModal from './DefaultJudgeResizeEventPropertiesModal.vue'

export const judgeResizeEvent: Command = {
    title: () => i18n.value.commands.judgeResizeEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#0000db',
        },
    },

    execute() {
        if (toolName.value === 'judgeResizeEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultJudgeResizeEventPropertiesModal, {})
            }
        } else {
            switchToolTo('judgeResizeEvent')

            notify(() => i18n.value.commands.judgeResizeEvent.switched)
        }
    },
}
