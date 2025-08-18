import type { Command } from '..'
import { pushState, state } from '../../../history'
import { bgm as currentBgm } from '../../../history/bgm'
import { stages } from '../../../history/stages'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import { addTimeScale } from '../../../state/mutations/values/timeScale'
import { createTransaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { timeScale } from '../../tools/values/timeScale'
import { view } from '../../view'
import StageIcon from './StageIcon.vue'
import StageModal from './StageModal.vue'

export const stage: Command = {
    title: () => i18n.value.commands.stage.title,
    icon: {
        is: StageIcon,
    },

    async execute() {
        let currentStage: number | undefined = await showModal(StageModal, {
            stage: view.stage
        })
        if (currentStage === undefined) return
        if (currentStage < 0) {
            let i = 0
            while (true) {
                if (!stages.value.find(s => s.id === i)) break
                i++
            }
            currentStage = i
            pushState(() => i18n.value.commands.stage.title, {
                ...state.value,
                store: {
                    ...state.value.store,
                    stages: [...state.value.store.stages, { id: currentStage }],
                }
            })
            const transaction = createTransaction(state.value)
            const selectedEntities = addTimeScale(transaction, { beat: 0, value: 1, stage: currentStage })
            pushState(interpolate(() => i18n.value.tools.values.added, `${selectedEntities.length}`, 'Timescale'), {
                ...transaction.commit(),
                selectedEntities,
            })
        }

        view.stage = currentStage

        notify(() => i18n.value.commands.stage.changed)
    },
}
