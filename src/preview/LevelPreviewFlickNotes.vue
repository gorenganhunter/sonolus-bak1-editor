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
import { rotate, resize, moveX, moveY } from './events'
import { getLane } from './lane'
import { noteDuration, flickNoteLayout, approach } from './note'
import { Quad } from "./Quad"

const flickNotes = computed(() =>
    [...cullEntities('flickNote', keys.value.min, keys.value.max)]
        .filter(({ beat, stage }) => beat >= beats(stage).value.min && beat < beats(stage).value.max)
        .sort((a, b) => b.beat - a.beat)
        .map(({ beat, lane, size, stage }) => {
        let layout = new Quad(
            {x: -size * (1 + 0.08 * Math.abs((lane % 1) - 0.5 - size / 2)),
            y: -0.02},
            {x: -size * (1 - 0.08 * Math.abs((lane % 1) - 0.5 - size / 2)),
            y: 0.02},
            {x: size * (1 - 0.08 * Math.abs((lane % 1) - 0.5 + size / 2)),
            y: 0.02},
            {x: size * (1 + 0.08 * Math.abs((lane % 1) - 0.5 + size / 2)),
                y: -0.02}
        )

            const targetTime = timeToScaledTime(timeScales.value.filter(t => t.stage === stage), beatToTime(bpms.value, beat))
            //const z = unlerp(targetTime - noteDuration.value, targetTime, scaledTimes.value.min)

        const s = approach(targetTime - noteDuration.value, targetTime, scaledTimes(stage).value.min)

        const angle = (rotate(stage).value % 360) / 180 * Math.PI
        const size2 = resize(stage).value
        const posX = moveX(stage).value
        const posY = moveY(stage).value

        // console.log(s, angle, size2, posX, posY)

        const rotate2 = angle + (Math.PI / 2 * Math.floor(lane))
        let cx = posX - size2 * s / 2 * Math.sin(-rotate2) + ((lane % 1) - 0.5) * size2 * s * Math.cos(rotate2)
        let cy = posY - size2 * s / 2 * Math.cos(rotate2) - ((lane % 1) - 0.5) * size2 * s * Math.sin(-rotate2)

        // console.log(rotate2, cx, cy)

        const points = layout.mul(size2 / 2 * s).rotate(rotate2).translate(cx, cy).toPoints()

            return {
                points,
                fill: "#f00",
            }
        }),
)
</script>

<template>
    <g stroke="white" stroke-width="0">
        <polygon v-for="(polygon, index) in flickNotes" :key="index" v-bind="polygon" />
    </g>
</template>
