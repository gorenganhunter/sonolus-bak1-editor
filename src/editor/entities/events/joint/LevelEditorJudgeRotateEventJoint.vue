<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    judgeRotateEventValueToLane,
    type JudgeRotateEventJointEntity,
} from '../../../../state/entities/events/joints/judgeRotate'
import { beatToTime } from '../../../../state/integrals/bpms'
import { lerp } from "../../../../utils/math"
import { ups } from '../../../view'

const props = defineProps<JudgeRotateEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="lerp(-4, 4, judgeRotateEventValueToLane(value))"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#006edb"
    />
</template>
