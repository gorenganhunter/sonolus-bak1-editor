<script setup lang="ts">
import type { NoteType } from '../../chart'
import { i18n } from '../../i18n'
import OptionalSelectField from './OptionalSelectField.vue'

const modelValue = defineModel<NoteType | undefined>({ required: true })
</script>

<template>
    <OptionalSelectField
        v-model="modelValue"
        :label="i18n.modals.form.noteType.label"
        :options="[
            [i18n.modals.form.noteType.default, 'default'],
            [i18n.modals.form.noteType.drag, 'drag'],
            [i18n.modals.form.noteType.flick, 'flick'],
            [i18n.modals.form.noteType.damage, 'damage'],
        ]"
    />
</template>
