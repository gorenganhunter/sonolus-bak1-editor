<script setup lang="ts">
import { ref } from 'vue'
import { i18n } from '../../../i18n'
import FormModal from '../../../modals/form/FormModal.vue'
import NumberField from '../../../modals/form/NumberField.vue'
import { view } from '../../view'

defineEmits<{
    close: [lane?: number]
}>()

const model = ref(view.lane)
</script>

<template>
    <FormModal :title="i18n.commands.lanes.custom.modal.title" @close="$emit('close')" @submit="$emit('close', model)">
        <NumberField v-model="model" :label="i18n.commands.lanes.custom.modal.lane" :min="1" :step="1" autofocus />
    </FormModal>
</template>
