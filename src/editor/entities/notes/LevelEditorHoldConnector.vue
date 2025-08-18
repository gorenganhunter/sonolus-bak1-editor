<script setup lang="ts">
import { bpms } from '../../../history/bpms'
import type { HoldNoteEntity } from '../../../state/entities/notes/holdNote'
import { beatToTime } from '../../../state/integrals/bpms'
import { viewBox, view } from '../../view'
import { lerp } from "../../../utils/math"

defineProps<HoldNoteEntity>()
</script>

<template>
    <rect :x="lerp(-4, 4, lane % 1 - size / 2)" :y="beatToTime(bpms, beat + duration) * viewBox.ups" :width="size * 8"
        :height="(beatToTime(bpms, beat) - beatToTime(bpms, beat + duration)) * viewBox.ups" class="scale-stroke"
        stroke-width="0.025" stroke="#fff" fill="#00f" />
</template>
