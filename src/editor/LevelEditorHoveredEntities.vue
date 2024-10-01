<script setup lang="ts">
import { bpms } from '../history/bpms'
import { beatToTime } from '../state/integrals/bpms'
import { view, viewBox } from './view'
</script>

<template>
    <template v-for="{ hitbox } in view.entities.hovered" :key="hitbox">
        <rect
            v-if="hitbox"
            :x="3.5 - hitbox.lane - hitbox.w - 0.1"
            :y="beatToTime(bpms, hitbox.beat) * viewBox.ups - hitbox.t - 0.1"
            :width="hitbox.w * 2 + 0.2"
            :height="hitbox.t + hitbox.b + 0.2"
            stroke="#fff"
            stroke-opacity="0.5"
            stroke-dasharray="6 4"
        />
    </template>
</template>
