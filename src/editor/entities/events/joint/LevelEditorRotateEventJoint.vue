<script setup lang="ts">
import { bpms } from '../../../../history/bpms'
import {
    rotateEventValueToLane,
    type RotateEventJointEntity,
} from '../../../../state/entities/events/joints/rotate'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox } from '../../../view'
import { lerp } from "../../../../utils/math"

defineProps<RotateEventJointEntity>()
</script>

<template>
    <circle :cx="lerp(-4, 4, rotateEventValueToLane(value))" :cy="beatToTime(bpms, beat) * viewBox.ups" r="0.1"
        stroke="#fff" fill="#0f0" />
</template>
