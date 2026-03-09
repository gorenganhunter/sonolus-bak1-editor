import type { Command } from '../..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { notify } from '../../../notification'
import { focusSidebar, isSidebarVisible } from '../../../sidebars'
import { switchToolTo, toolName } from '../../../tools'
import EventIcon from '../EventIcon.vue'
import DefaultJudgeRotateEventPropertiesModal from './DefaultJudgeRotateEventPropertiesModal.vue'

export const judgeRotateEvent: Command = {
    title: () => i18n.value.commands.judgeRotateEvent.title,
    icon: {
        is: EventIcon,
        props: {
            fill: '#006edb',
        },
    },

    execute() {
        if (toolName.value === 'judgeRotateEvent') {
            if (isSidebarVisible.value) {
                focusSidebar()
            } else {
                void showModal(DefaultJudgeRotateEventPropertiesModal, {})
            }
        } else {
            switchToolTo('judgeRotateEvent')

            notify(() => i18n.value.commands.judgeRotateEvent.switched)
        }
    },
}
