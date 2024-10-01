<script setup lang="ts">
defineProps<{
    fill: string
}>()
</script>

<template>
    <svg viewBox="-0.5 -0.5 1 1">
        <circle cx="0" cy="0" r="0.25" stroke="#fff" stroke-width="0.05" :fill />
    </svg>
</template>
