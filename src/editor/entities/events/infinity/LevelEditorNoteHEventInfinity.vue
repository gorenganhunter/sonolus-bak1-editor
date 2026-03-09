<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import { store } from '../../../../history/store'
import { noteHEventValueToLane } from '../../../../state/entities/events/joints/noteH'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox, view, ups } from '../../../view'

const range = computed(() => store.value.eventRanges.noteHEventJoint?.get(view.stage))
</script>

<template>
    <g stroke="#00dbdb" stroke-opacity="0.5">
        <template v-if="range">
            <line
                :x1="(noteHEventValueToLane(range.min.value) - 0.5) * 8"
                :x2="(noteHEventValueToLane(range.min.value) - 0.5) * 8"
                :y1="0"
                :y2="beatToTime(bpms, range.min.beat) * ups"
            />
            <line
                :x1="(noteHEventValueToLane(range.max.value) - 0.5) * 8"
                :x2="(noteHEventValueToLane(range.max.value) - 0.5) * 8"
                :y1="beatToTime(bpms, range.max.beat) * ups"
                :y2="viewBox.t"
            />
        </template>
        <line
            v-else
            :x1="(noteHEventValueToLane(0) - 0.5) * 8"
            :x2="(noteHEventValueToLane(0) - 0.5) * 8"
            :y1="0"
            :y2="viewBox.t"
        />
    </g>
</template>
