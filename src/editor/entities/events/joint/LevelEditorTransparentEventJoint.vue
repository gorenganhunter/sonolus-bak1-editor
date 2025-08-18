<script setup lang="ts">
import { bpms } from '../../../../history/bpms'
import {
    transparentEventValueToLane,
    type TransparentEventJointEntity,
} from '../../../../state/entities/events/joints/transparent'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox } from '../../../view'

defineProps<TransparentEventJointEntity>()
</script>

<template>
    <circle
        :cx="(transparentEventValueToLane(value) - 0.5) * 8"
        :cy="beatToTime(bpms, beat) * viewBox.ups"
        r="0.1"
        stroke="#fff"
        fill="#00f"
    />
</template>
