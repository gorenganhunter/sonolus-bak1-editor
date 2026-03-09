<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    judgeResizeEventValueToLane,
    type JudgeResizeEventJointEntity,
} from '../../../../state/entities/events/joints/judgeResize'
import { beatToTime } from '../../../../state/integrals/bpms'
import { ups } from '../../../view'

const props = defineProps<JudgeResizeEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="(judgeResizeEventValueToLane(value) - 0.5) * 8"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#0000db"
    />
</template>
