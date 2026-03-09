<script setup lang="ts">
defineProps<{
    size: number
}>()
</script>

<template>
    <line x1="0" y1="0" :x2="size * 8" y2="0.5" stroke="#444" />
    <line x1="0" y1="0.5" :x2="size * 8" y2="0" stroke="#444" />
</template>
