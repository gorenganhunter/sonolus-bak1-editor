<script setup lang="ts">
import { colorNames } from '../../colors'
import { i18n } from '../../i18n'
import SelectField from './SelectField.vue'

defineProps<{
    label: string
    autofocus?: boolean
}>()

const modelValue = defineModel<number>({ required: true })
</script>

<template>
    <SelectField
        v-model="modelValue"
        :label
        :options="colorNames.map((name, index) => [i18n.modals.form.color[name], index])"
        :autofocus
    />
</template>
