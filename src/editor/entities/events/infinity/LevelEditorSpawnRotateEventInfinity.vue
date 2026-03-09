<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import { store } from '../../../../history/store'
import { spawnRotateEventValueToLane } from '../../../../state/entities/events/joints/spawnRotate'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox, view, ups } from '../../../view'

const range = computed(() => store.value.eventRanges.spawnRotateEventJoint?.get(view.stage))
</script>

<template>
    <g stroke="#00db58" stroke-opacity="0.5">
        <template v-if="range">
            <line
                :x1="spawnRotateEventValueToLane(range.min.value) * 8 - 4"
                :x2="spawnRotateEventValueToLane(range.min.value) * 8 - 4"
                :y1="0"
                :y2="beatToTime(bpms, range.min.beat) * ups"
            />
            <line
                :x1="spawnRotateEventValueToLane(range.max.value) * 8 - 4"
                :x2="spawnRotateEventValueToLane(range.max.value) * 8 - 4"
                :y1="beatToTime(bpms, range.max.beat) * ups"
                :y2="viewBox.t"
            />
        </template>
        <line
            v-else
            :x1="spawnRotateEventValueToLane(0) * 8 - 4"
            :x2="spawnRotateEventValueToLane(0) * 8 - 4"
            :y1="0"
            :y2="viewBox.t"
        />
    </g>
</template>
