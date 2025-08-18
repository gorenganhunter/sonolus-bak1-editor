<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { HoldNoteObject } from '../../../chart'
import { i18n } from '../../../i18n'
import ColorField from '../../../modals/form/ColorField.vue'
import FormModal from '../../../modals/form/FormModal.vue'
import NumberField from '../../../modals/form/NumberField.vue'

const props = defineProps<{
    object: HoldNoteObject
}>()

defineEmits<{
    close: [holdNote?: HoldNoteObject]
}>()

const model = shallowReactive({ ...props.object })
</script>

<template>
    <FormModal :title="i18n.tools.holdNote.modal.title" @close="$emit('close')" @submit="$emit('close', model)">
        <!--ColorField v-model="model.color" :label="i18n.tools.holdNote.modal.color" autofocus /-->
        <NumberField v-model="model.lane" :label="i18n.tools.holdNote.modal.lane" :min="0" :max="4" step="any" />
        <NumberField v-model="model.size" :label="i18n.tools.holdNote.modal.size" :min="0" :max="1" step="any" />
        <NumberField v-model="model.beat" :label="i18n.tools.holdNote.modal.beat" :min="0" step="any" />
        <NumberField v-model="model.duration" :label="i18n.tools.holdNote.modal.duration" :min="0" step="any" />
    </FormModal>
</template>
