<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { ValueObject } from '../../../../chart'
import { i18n } from '../../../../i18n'
import FormModal from '../../../../modals/form/FormModal.vue'
import NumberField from '../../../../modals/form/NumberField.vue'

const props = defineProps<{
    object: ValueObject
}>()

defineEmits<{
    close: [bpm?: ValueObject]
}>()

const model = shallowReactive({ ...props.object })
</script>

<template>
    <FormModal
        :title="i18n.tools.values.modals.bpm.title"
        @close="$emit('close')"
        @submit="$emit('close', model)"
    >
        <NumberField
            v-model="model.value"
            :label="i18n.tools.values.modals.bpm.bpm"
            :min="1"
            :step="0.001"
            autofocus
        />
        <NumberField
            v-model="model.beat"
            :label="i18n.tools.values.modals.bpm.beat"
            :min="0"
            step="any"
        />
    </FormModal>
</template>
