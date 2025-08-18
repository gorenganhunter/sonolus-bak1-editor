<script setup lang="ts">
import { ref } from 'vue'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import FileField from '../../../modals/form/FileField.vue'
import SelectField from '../../../modals/form/SelectField.vue'
import FormModal from '../../../modals/form/FormModal.vue'
import NumberField from '../../../modals/form/NumberField.vue'
import LoadingModal from '../../../modals/LoadingModal.vue'
import { loadBgm } from '../../../player'
import { settings } from '../../../settings'
import type { Bgm } from '../../../state/bgm'
import { formatTime } from '../../../utils/format'
import { timeout } from '../../../utils/promise'
import { createWaveform } from '../../../waveform'
import { state, replaceState } from '../../../history'
import { view } from '../../view'
import { stages } from '../../../history/stages'

defineEmits<{
    close: [stage?: Number]
}>()

const model = ref(view.stage)

const options = [["New Stage", -1], ...stages.value.map(({ id }) => ([`Stage ${id}`, id]))]

const label = `${i18n.value.commands.stage.title} (Current: Stage ${view.stage})`

// const onSelect = () => {}{
//     void showModal(LoadingModal, {
//         title: () => i18n.value.commands.stage.title,
//         async *task() {
//
//             /*            yield () => i18n.value.commands.bgm.modal.loading
//                         const data = await file.arrayBuffer()
//
//                         yield () => i18n.value.commands.bgm.modal.decoding
//
//                         const buffer = await loadBgm(data)
//
//                         yield () => i18n.value.commands.bgm.modal.generating
//                         await timeout(50)
//
//                         const waveform = await createWaveform(buffer, settings.waveform)
//
//                         model.buffer = buffer
//                         model.waveform = waveform*/
//         },
//     })
// }

</script>

<template>
    <FormModal :title="i18n.commands.stage.title" @close="$emit('close')" @submit="$emit('close', model)">
        <SelectField v-model="model" :label :options />
    </FormModal>
</template>
