<script setup lang="ts">
import { computed } from 'vue'
import { beats, keys, scaledTimes } from '.'
import { colors } from '../colors'
import { bpms } from '../history/bpms'
import { cullEntities } from '../history/store'
import { timeScales } from '../history/timeScales'
import { beatToTime } from '../state/integrals/bpms'
import { timeToScaledTime } from '../state/integrals/timeScales'
import { unlerp } from '../utils/math'
import { rotate, shift } from './events'
import { getLane } from './lane'
import { noteDuration, tapNoteLayout } from './note'

const tapNotes = computed(() =>
    [...cullEntities('tapNote', keys.value.min, keys.value.max)]
        .filter(({ beat }) => beat >= beats.value.min && beat < beats.value.max)
        .sort((a, b) => b.beat - a.beat)
        .map(({ beat, color, lane }) => {
            const [l, r] = getLane(lane, 1, shift.value, rotate.value)

            const targetTime = timeToScaledTime(timeScales.value, beatToTime(bpms.value, beat))
            const z = unlerp(targetTime - noteDuration.value, targetTime, scaledTimes.value.min)

            return {
                points: tapNoteLayout(l, r, z),
                fill: colors[color],
            }
        }),
)
</script>

<template>
    <g stroke="white" stroke-width="0.02">
        <polygon v-for="(polygon, index) in tapNotes" :key="index" v-bind="polygon" />
    </g>
</template>
