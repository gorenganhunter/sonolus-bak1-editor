<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../../history/bpms'
import {
    spawnMoveXEventValueToLane,
    type SpawnMoveXEventJointEntity,
} from '../../../../state/entities/events/joints/spawnMoveX'
import { beatToTime } from '../../../../state/integrals/bpms'
import { ups } from '../../../view'

const props = defineProps<SpawnMoveXEventJointEntity>()

const time = computed(() => beatToTime(bpms.value, props.beat))
</script>

<template>
    <circle
        :cx="(spawnMoveXEventValueToLane(value) - 0.5) * 8"
        :cy="time * ups"
        r="0.1"
        stroke="#fff"
        fill="#db0000"
    />
</template>
