<script setup lang="ts">
import { shallowReactive } from 'vue'
import type { SingleHoldNoteJointObject } from '../../../../chart'
import { i18n } from '../../../../i18n'
import ColorField from '../../../../modals/form/ColorField.vue'
import FormModal from '../../../../modals/form/FormModal.vue'
import NumberField from '../../../../modals/form/NumberField.vue'

const props = defineProps<{
    object: SingleHoldNoteJointObject
}>()

defineEmits<{
    close: [tapNote?: SingleHoldNoteJointObject]
}>()

const model = shallowReactive({ ...props.object })
</script>

<template>
    <FormModal
        :title="i18n.tools.holdNotes.modals.singleHoldNote.title"
        @close="$emit('close')"
        @submit="$emit('close', model)"
    >
        <ColorField
            v-model="model.color"
            :label="i18n.tools.holdNotes.modals.singleHoldNote.color"
            autofocus
        />
        <NumberField
            v-model="model.lane"
            :label="i18n.tools.holdNotes.modals.singleHoldNote.lane"
            :min="0"
            :max="7"
            :step="1"
        />
        <NumberField
            v-model="model.beat"
            :label="i18n.tools.holdNotes.modals.singleHoldNote.beat"
            :min="0"
            step="any"
        />
        <NumberField
            v-model="model.scaleL"
            :label="i18n.tools.holdNotes.modals.singleHoldNote.scaleL"
            :min="0"
            :max="1"
            step="any"
        />
        <NumberField
            v-model="model.scaleR"
            :label="i18n.tools.holdNotes.modals.singleHoldNote.scaleR"
            :min="0"
            :max="1"
            step="any"
        />
    </FormModal>
</template>
