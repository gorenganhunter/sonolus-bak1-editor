<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import { store } from '../../../../history/store'
import { judgeMoveYEventValueToLane } from '../../../../state/entities/events/joints/judgeMoveY'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox, view, ups } from '../../../view'

const range = computed(() => store.value.eventRanges.judgeMoveYEventJoint?.get(view.stage))
</script>

<template>
    <g stroke="#5800db" stroke-opacity="0.5">
        <template v-if="range">
            <line
                :x1="(judgeMoveYEventValueToLane(range.min.value) - 0.5) * 8"
                :x2="(judgeMoveYEventValueToLane(range.min.value) - 0.5) * 8"
                :y1="0"
                :y2="beatToTime(bpms, range.min.beat) * ups"
            />
            <line
                :x1="(judgeMoveYEventValueToLane(range.max.value) - 0.5) * 8"
                :x2="(judgeMoveYEventValueToLane(range.max.value) - 0.5) * 8"
                :y1="beatToTime(bpms, range.max.beat) * ups"
                :y2="viewBox.t"
            />
        </template>
        <line
            v-else
            :x1="(judgeMoveYEventValueToLane(0) - 0.5) * 8"
            :x2="(judgeMoveYEventValueToLane(0) - 0.5) * 8"
            :y1="0"
            :y2="viewBox.t"
        />
    </g>
</template>
