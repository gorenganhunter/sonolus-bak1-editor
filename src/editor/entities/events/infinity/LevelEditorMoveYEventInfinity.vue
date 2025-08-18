<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import { store } from '../../../../history/store'
import { moveYEventValueToLane } from '../../../../state/entities/events/joints/moveY'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox, view } from '../../../view'

const range = computed(() => {
    let evs = []
    store.value.grid.moveYEventJoint.forEach(b => [...b].forEach(a => { if(a.stage === view.stage) evs.push(a) }))
    evs = evs.sort((a, b) => a.beat - b.beat)
    return evs.length ? { min: evs[0], max: evs[evs.length - 1] } : null
})
</script>

<template>
    <g stroke="#0ff" stroke-opacity="0.5">
        <template v-if="range">
            <line
                :x1="(moveYEventValueToLane(range.min.value) - 0.5) * 8"
                :x2="(moveYEventValueToLane(range.min.value) - 0.5) * 8"
                :y1="0"
                :y2="beatToTime(bpms, range.min.beat) * viewBox.ups"
            />
            <line
                :x1="(moveYEventValueToLane(range.max.value) - 0.5) * 8"
                :x2="(moveYEventValueToLane(range.max.value) - 0.5) * 8"
                :y1="beatToTime(bpms, range.max.beat) * viewBox.ups"
                :y2="viewBox.t"
            />
        </template>
        <line
            v-else
            :x1="(moveYEventValueToLane(0) - 0.5) * 8"
            :x2="(moveYEventValueToLane(0) - 0.5) * 8"
            :y1="0"
            :y2="viewBox.t"
        />
    </g>
</template>
