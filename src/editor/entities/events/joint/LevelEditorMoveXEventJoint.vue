<script setup lang="ts">
import { bpms } from '../../../../history/bpms'
import {
    moveXEventValueToLane,
    type MoveXEventJointEntity,
} from '../../../../state/entities/events/joints/moveX'
import { beatToTime } from '../../../../state/integrals/bpms'
import { viewBox } from '../../../view'

defineProps<MoveXEventJointEntity>()
</script>

<template>
    <circle
        :cx="(moveXEventValueToLane(value) - 0.5) * 8"
        :cy="beatToTime(bpms, beat) * viewBox.ups"
        r="0.1"
        stroke="#fff"
        fill="#ff0"
    />
</template>
