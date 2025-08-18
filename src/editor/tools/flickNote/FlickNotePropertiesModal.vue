<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { FlickNoteObject } from '../../../chart'
import { i18n } from '../../../i18n'
import ColorField from '../../../modals/form/ColorField.vue'
import FormModal from '../../../modals/form/FormModal.vue'
import NumberField from '../../../modals/form/NumberField.vue'

const props = defineProps<{
    object: FlickNoteObject
}>()

defineEmits<{
    close: [flickNote?: FlickNoteObject]
}>()

const model = shallowReactive({ ...props.object })
</script>

<template>
    <FormModal :title="i18n.tools.flickNote.modal.title" @close="$emit('close')" @submit="$emit('close', model)">
        <!--ColorField v-model="model.color" :label="i18n.tools.flickNote.modal.color" autofocus /-->
        <NumberField v-model="model.lane" :label="i18n.tools.flickNote.modal.lane" :min="0" :max="4" step="any" />
        <NumberField v-model="model.size" :label="i18n.tools.flickNote.modal.size" :min="0" :max="1" step="any" />
        <NumberField v-model="model.beat" :label="i18n.tools.flickNote.modal.beat" :min="0" step="any" />
    </FormModal>
</template>
