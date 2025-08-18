<script setup lang="ts">
import { bpms } from '../../../../history/bpms'
import {
    resizeEventValueToLane,
    type ResizeEventJointEntity,
} from '../../../../state/entities/events/joints/resize'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox } from '../../../view'

defineProps<ResizeEventJointEntity>()
</script>

<template>
    <circle
        :cx="(resizeEventValueToLane(value) - 0.5) * 8"
        :cy="beatToTime(bpms, beat) * viewBox.ups"
        r="0.1"
        stroke="#fff"
        fill="#f00"
    />
</template>
