<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    spawnRotateEventValueToLane,
    type SpawnRotateEventJointEntity,
} from '../../../../state/entities/events/joints/spawnRotate'
import { beatToTime } from '../../../../state/integrals/bpms'
import { lerp } from "../../../../utils/math"
import { ups } from '../../../view'

const props = defineProps<SpawnRotateEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="lerp(-4, 4, spawnRotateEventValueToLane(value))"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#00db58"
    />
</template>
