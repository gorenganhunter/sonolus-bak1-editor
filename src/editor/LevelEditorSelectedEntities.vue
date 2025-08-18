<script setup lang="ts">
import { bpms } from '../history/bpms'
import { selectedEntities } from '../history/selectedEntities'
import { beatToTime } from '../state/integrals/bpms'
import { view, viewBox } from './view'
import { lerp } from "../utils/math"
</script>

<template>
    <template v-for="{ hitbox, stage } in selectedEntities" :key="hitbox">
        <rect v-if="hitbox && Math.floor(hitbox.lane) === view.side && stage === view.stage"
            :x="(hitbox.lane % 1 - 1 / view.lane / 2) * 8 - (4 - 4 / view.lane) - hitbox.w * 4 - 0.1"
            :y="beatToTime(bpms, hitbox.beat) * viewBox.ups - hitbox.t - 0.1" :width="hitbox.w * 4 * 2 + 0.2"
            :height="hitbox.t + hitbox.b + 0.2" stroke="#fff" stroke-dasharray="6 4" />
    </template>
</template>
