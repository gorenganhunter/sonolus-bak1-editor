<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    rotateEventValueToLane,
    type RotateEventJointEntity,
} from '../../../../state/entities/events/joints/rotate'
import { beatToTime } from '../../../../state/integrals/bpms'
import { lerp } from "../../../../utils/math"
import { ups } from '../../../view'

const props = defineProps<RotateEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="lerp(-4, 4, rotateEventValueToLane(value))"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#0f0"
    />
</template>
