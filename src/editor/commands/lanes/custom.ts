import type { Command } from '..'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { view } from '../../view'
import TextIcon from '../TextIcon.vue'
import CustomLaneModal from './CustomLaneModal.vue'

export const laneCustom: Command = {
    title: () => i18n.value.commands.lanes.custom.title,
    icon: {
        is: TextIcon,
        props: {
            title: '1/n',
        },
    },

    async execute() {
        const lane: number | undefined = await showModal(CustomLaneModal, {})
        if (!lane) return

        view.lane = lane

        notify(interpolate(() => i18n.value.commands.lanes.switched, `${lane}`))
    },
}
