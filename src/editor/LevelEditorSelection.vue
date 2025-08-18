<script setup lang="ts">
import { view, viewBox } from './view'
</script>

<template>
    <rect v-if="view.selection" :x="view.selection.laneMin * 8 - 4" :y="view.selection.timeMax * viewBox.ups"
        :width="(view.selection.laneMax - view.selection.laneMin) * 8"
        :height="(view.selection.timeMin - view.selection.timeMax) * viewBox.ups" stroke="#fff" stroke-opacity="0.5"
        stroke-dasharray="6 4" fill="#fff" fill-opacity="0.25" />
</template>
