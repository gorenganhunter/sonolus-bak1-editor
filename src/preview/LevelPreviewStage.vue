<script setup lang="ts">
import { computed } from 'vue'
import { rotate, shift } from './events'
import { getLane, laneLayout } from './lane'

const lanes = computed(() =>
    [...Array(8).keys()].map((i) => laneLayout(...getLane(i, 1, shift.value, rotate.value))),
)
</script>

<template>
    <polygon v-for="(points, index) in lanes" :key="index" :points stroke="white" />
</template>
