<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    spawnResizeEventValueToLane,
    type SpawnResizeEventJointEntity,
} from '../../../../state/entities/events/joints/spawnResize'
import { beatToTime } from '../../../../state/integrals/bpms'
import { ups } from '../../../view'

const props = defineProps<SpawnResizeEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="(spawnResizeEventValueToLane(value) - 0.5) * 8"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#dbdb00"
    />
</template>
