<script setup lang="ts">
import { computed } from 'vue'
import { stageLayouts } from "./stage"

const stages = computed(() => stageLayouts.value.map(({ lane, judgeline, opacity }) => ({ lane: lane.toPoints(), judgeline: judgeline.toPoints(), opacity })))
// const lanes = computed(() =>
//     ([{
//         points: laneLayout(...getLane(0, 1, shift.value, rotate.value)),
//         centers: [...Array(4).keys()].map((i) => 
//             transform(getLaneCenter(i, 1, shift.value, rotate.value), 0)
//     )}]))

</script>

<template>
    <template v-for="({ lane, judgeline, opacity }, index) in stages" :key="index">
    <g stroke="#222" stroke-width="0.02">
        <polygon :points="lane" fill="#444" :opacity="opacity" />
        <polygon :points="judgeline" fill="#fff" :opacity="opacity" />
    </g>
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
