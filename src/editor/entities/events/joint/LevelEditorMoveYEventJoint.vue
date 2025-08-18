<script setup lang="ts">
import { bpms } from '../../../../history/bpms'
import {
    moveYEventValueToLane,
    type MoveYEventJointEntity,
} from '../../../../state/entities/events/joints/moveY'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox } from '../../../view'

defineProps<MoveYEventJointEntity>()
</script>

<template>
    <circle
        :cx="(moveYEventValueToLane(value) - 0.5) * 8"
        :cy="beatToTime(bpms, beat) * viewBox.ups"
        r="0.1"
        stroke="#fff"
        fill="#0ff"
    />
</template>
