<script setup lang="ts">
import { stages } from '../../history/stages'
import { i18n } from '../../i18n'
import MultiSelectField from './MultiSelectField.vue'

const modelValue = defineModel<number | undefined>({ required: true })
</script>

<template>
    <MultiSelectField
        v-model="modelValue"
        :label="i18n.commands.stage.title"
        :options="
            stages.map(({ id }) => ([`Stage ${id}`, id]))
        "
    />
</template>
