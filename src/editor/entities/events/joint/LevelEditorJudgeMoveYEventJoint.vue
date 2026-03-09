<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    judgeMoveYEventValueToLane,
    type JudgeMoveYEventJointEntity,
} from '../../../../state/entities/events/joints/judgeMoveY'
import { beatToTime } from '../../../../state/integrals/bpms'
import { ups } from '../../../view'

const props = defineProps<JudgeMoveYEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="(judgeMoveYEventValueToLane(value) - 0.5) * 8"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#5800db"
    />
</template>
