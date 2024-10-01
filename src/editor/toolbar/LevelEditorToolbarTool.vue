<script setup lang="ts">
import { commands, type CommandName } from '../commands'

defineProps<{
    name: CommandName
}>()
</script>

<template>
    <button
        class="size-8 bg-[#222] p-2 transition-colors hover:bg-[#444] active:bg-[#111]"
        :title="commands[name].title()"
    >
        <component
            :is="commands[name].icon.is"
            class="size-full"
            v-bind="commands[name].icon.props"
        />
    </button>
</template>
