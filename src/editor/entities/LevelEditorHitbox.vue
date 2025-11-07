<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../history/bpms'
import type { EntityHitbox } from '../../state/entities'
import { beatToTime } from '../../state/integrals/bpms'
import { ups, view } from '../view'

const props = defineProps<{
    hitbox: EntityHitbox,
    stage: number
}>()

const time = computed(() => beatToTime(bpms.value, props.hitbox.beat))
</script>

<template>
    <!--rect
        :x="3.5 - hitbox.lane - hitbox.w - 0.1"
        :y="time * ups - hitbox.t - 0.1"
        :width="hitbox.w * 2 + 0.2"
        :height="hitbox.t + hitbox.b + 0.2"
        stroke="#fff"
        stroke-dasharray="6 4"
    /-->
        <rect v-if="hitbox && Math.floor(hitbox.lane) === view.side && (stage === view.stage)"
            :x="(hitbox.lane % 1 - 1 / view.lane / 2) * 8 - (4 - 4 / view.lane) - hitbox.w * 4 - 0.1"
            :y="beatToTime(bpms, hitbox.beat) * ups - hitbox.t - 0.1" :width="hitbox.w * 4 * 2 + 0.2"
            :height="hitbox.t + hitbox.b + 0.2" stroke="#fff" stroke-opacity="0.5" stroke-dasharray="6 4" />
</template>
