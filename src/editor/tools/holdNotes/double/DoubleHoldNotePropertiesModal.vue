<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { DoubleHoldNoteJointObject } from '../../../../chart'
import { i18n } from '../../../../i18n'
import ColorField from '../../../../modals/form/ColorField.vue'
import FormModal from '../../../../modals/form/FormModal.vue'
import NumberField from '../../../../modals/form/NumberField.vue'

const props = defineProps<{
    object: DoubleHoldNoteJointObject
}>()

defineEmits<{
    close: [tapNote?: DoubleHoldNoteJointObject]
}>()

const model = shallowReactive({ ...props.object })
</script>

<template>
    <FormModal
        :title="i18n.tools.holdNotes.modals.doubleHoldNote.title"
        @close="$emit('close')"
        @submit="$emit('close', model)"
    >
        <ColorField
            v-model="model.color"
            :label="i18n.tools.holdNotes.modals.doubleHoldNote.color"
            autofocus
        />
        <NumberField
            v-model="model.laneL"
            :label="i18n.tools.holdNotes.modals.doubleHoldNote.laneL"
            :min="0"
            :max="7"
            :step="1"
        />
        <NumberField
            v-model="model.laneR"
            :label="i18n.tools.holdNotes.modals.doubleHoldNote.laneR"
            :min="0"
            :max="7"
            :step="1"
        />
        <NumberField
            v-model="model.beat"
            :label="i18n.tools.holdNotes.modals.doubleHoldNote.beat"
            :min="0"
            step="any"
        />
    </FormModal>
</template>
