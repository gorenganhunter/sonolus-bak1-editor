<script setup lang="ts">
import { computed } from 'vue'
import { beats } from '.'
import { bpms } from '../history/bpms'
import { beatToTime } from '../state/integrals/bpms'
import { computedRange } from '../utils/range'
import { remap } from '../utils/math'
import { view, viewBox } from './view'

const range = computedRange(() => ({
    min: Math.ceil(beats.value.min * view.division),
    max: Math.floor(beats.value.max * view.division),
}))

const lines = computed(() =>
    [...Array(range.value.max - range.value.min + 1).keys()].map((i) => ({
        y: beatToTime(bpms.value, (i + range.value.min) / view.division) * viewBox.value.ups,
        isBeat: (i + range.value.min) % view.division === 0,
    })),
)
</script>

<template>
    <g stroke="#fff">
        <g :transform="`translate(-5, ${Math.min(0, viewBox.b)}) scale(1, ${viewBox.t - Math.min(0, viewBox.b)})`">
            <line v-for="i in view.lane + 1" :key="i" :x1="remap(1, view.lane + 1, 1, 9, i)"
                :x2="remap(1, view.lane + 1, 1, 9, i)" :y1="0" :y2="1"
                :stroke-opacity="i === 1 || i === view.lane + 1 ? 0.5 : 0.25" />
        </g>
        <line v-for="{ y, isBeat } in lines" :key="y" :x1="-4" :x2="4" :y1="y" :y2="y"
            :stroke-opacity="isBeat ? 0.5 : 0.25" />
    </g>
</template>
