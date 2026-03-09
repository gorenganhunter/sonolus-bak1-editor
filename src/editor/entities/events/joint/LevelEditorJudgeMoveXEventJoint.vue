<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    judgeMoveXEventValueToLane,
    type JudgeMoveXEventJointEntity,
} from '../../../../state/entities/events/joints/judgeMoveX'
import { beatToTime } from '../../../../state/integrals/bpms'
import { ups } from '../../../view'

const props = defineProps<JudgeMoveXEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="(judgeMoveXEventValueToLane(value) - 0.5) * 8"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#db00db"
    />
</template>
