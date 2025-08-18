<script setup lang="ts">
import { computed } from 'vue'
import { view } from '../editor/view'
import { rotate, resize, transparent, moveX, moveY } from './events'
import { getLane, getLaneCenter, laneLayout } from './lane'
import { transform } from './projection'
import { stages } from '../history/stages'
import { Quad } from "./Quad"

const stages2 = computed(() =>
    [...stages.value]
    .map(({ id }) => {
//            const [l, r] = getLane(lane, 1, shift.value, rotate.value)

//            const targetTime = timeToScaledTime(timeScales.value, beatToTime(bpms.value, beat))
//            const z = unlerp(targetTime - noteDuration.value, targetTime, scaledTimes.value.min)

            const points = new Quad().rotate((rotate(id).value % 360) / 180 * Math.PI).mul(resize(id).value / 2).translate(moveX(id).value, moveY(id).value).toPoints()

            return {
                points,
                opacity: transparent(id).value
            }
        }),
)
// const lanes = computed(() =>
//     ([{
//         points: laneLayout(...getLane(0, 1, shift.value, rotate.value)),
//         centers: [...Array(4).keys()].map((i) => 
//             transform(getLaneCenter(i, 1, shift.value, rotate.value), 0)
//     )}]))

</script>

<template>
    <template v-for="({ points, opacity }, index) in stages2" :key="index">
        <polygon :points stroke="white" :stroke-opacity="opacity" />
    </template>
    <!--template v-for="({ points, centers }, index) in lanes" :key="index">
        <polygon :points stroke="white" />
        <template v-for="({ x, y }, i) in centers" :key="i">
            <text
                :x
                :y="-y"
                text-anchor="middle"
                dominant-baseline="middle"
                transform="scale(1, -1)"
                fill="white"
                :fill-opacity="i === view.hoverLane ? 1 : 0.5"
            >
                {{ i }}
            </text>
        </template>
    </template-->
</template>
