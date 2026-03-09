<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import { store } from '../../../../history/store'
import { judgeRotateEventValueToLane } from '../../../../state/entities/events/joints/judgeRotate'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox, view, ups } from '../../../view'

const range = computed(() => store.value.eventRanges.judgeRotateEventJoint?.get(view.stage))
</script>

<template>
    <g stroke="#006edb" stroke-opacity="0.5">
        <template v-if="range">
            <line
                :x1="judgeRotateEventValueToLane(range.min.value) * 8 - 4"
                :x2="judgeRotateEventValueToLane(range.min.value) * 8 - 4"
                :y1="0"
                :y2="beatToTime(bpms, range.min.beat) * ups"
            />
            <line
                :x1="judgeRotateEventValueToLane(range.max.value) * 8 - 4"
                :x2="judgeRotateEventValueToLane(range.max.value) * 8 - 4"
                :y1="beatToTime(bpms, range.max.beat) * ups"
                :y2="viewBox.t"
            />
        </template>
        <line
            v-else
            :x1="judgeRotateEventValueToLane(0) * 8 - 4"
            :x2="judgeRotateEventValueToLane(0) * 8 - 4"
            :y1="0"
            :y2="viewBox.t"
        />
    </g>
</template>
