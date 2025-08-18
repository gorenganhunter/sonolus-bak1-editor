<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { EventObject } from '../../../../chart'
import { i18n } from '../../../../i18n'
import EaseField from '../../../../modals/form/EaseField.vue'
import FormModal from '../../../../modals/form/FormModal.vue'
import NumberField from '../../../../modals/form/NumberField.vue'

const props = defineProps<{
    object: EventObject
}>()

defineEmits<{
    close: [moveYEvent?: EventObject]
}>()

const model = shallowReactive({ ...props.object })
</script>

<template>
    <FormModal
        :title="i18n.tools.events.modals.moveYEvent.title"
        @close="$emit('close')"
        @submit="$emit('close', model)"
    >
        <NumberField
            v-model="model.value"
            :label="i18n.tools.events.modals.moveYEvent.value"
            step="any"
            autofocus
        />
        <EaseField v-model="model.ease" :label="i18n.tools.events.modals.moveYEvent.ease" />
        <NumberField
            v-model="model.beat"
            :label="i18n.tools.events.modals.moveYEvent.beat"
            :min="0"
            step="any"
        />
    </FormModal>
</template>
