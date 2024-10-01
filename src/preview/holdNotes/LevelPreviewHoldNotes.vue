<script setup lang="ts">
import { computed } from 'vue'
import { getDoubleHoldNoteConnections } from './connections/double'
import { getSingleHoldNoteConnections } from './connections/single'
import { getDoubleHoldNoteJoints } from './joints/double'
import { getSingleHoldNoteJoints } from './joints/single'

const holdNotes = computed(() =>
    [
        ...getSingleHoldNoteJoints(),
        ...getDoubleHoldNoteJoints(),
        ...getSingleHoldNoteConnections(),
        ...getDoubleHoldNoteConnections(),
    ].sort((a, b) => b.time - a.time || b.depth - a.depth),
)
</script>

<template>
    <g stroke-width="0.02">
        <polygon v-for="({ polygon }, index) in holdNotes" :key="index" v-bind="polygon" />
    </g>
</template>
