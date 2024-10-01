<script setup lang="ts">
import { view, viewBox } from './view'
</script>

<template>
    <rect
        v-if="view.selection"
        :x="3.5 - view.selection.laneMax"
        :y="view.selection.timeMax * viewBox.ups"
        :width="view.selection.laneMax - view.selection.laneMin"
        :height="(view.selection.timeMin - view.selection.timeMax) * viewBox.ups"
        stroke="#fff"
        stroke-opacity="0.5"
        stroke-dasharray="6 4"
        fill="#fff"
        fill-opacity="0.25"
    />
</template>
