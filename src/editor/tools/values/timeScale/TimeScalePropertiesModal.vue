<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { StageValueObject } from '../../../../chart'
import { i18n } from '../../../../i18n'
import FormModal from '../../../../modals/form/FormModal.vue'
import NumberField from '../../../../modals/form/NumberField.vue'

const props = defineProps<{
    object: StageValueObject
}>()

defineEmits<{
    close: [timeScale?: StageValueObject]
}>()

const model = shallowReactive({ ...props.object })
</script>

<template>
    <FormModal :title="i18n.tools.values.modals.timeScale.title" @close="$emit('close')"
        @submit="$emit('close', model)">
        <NumberField v-model="model.value" :label="i18n.tools.values.modals.timeScale.timeScale" :min="0.001"
            :max="1000" :step="0.001" autofocus />
        <NumberField v-model="model.beat" :label="i18n.tools.values.modals.timeScale.beat" :min="0" step="any" />
    </FormModal>
</template>
