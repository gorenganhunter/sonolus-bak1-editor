<script setup lang="ts">
import { bpms } from '../../../history/bpms'
import type { DragNoteEntity } from '../../../state/entities/notes/dragNote'
import { beatToTime } from '../../../state/integrals/bpms'
import { viewBox, view } from '../../view'
import { lerp } from "../../../utils/math"

defineProps<DragNoteEntity>()
</script>

<template>
    <rect :x="lerp(-4, 4, lane % 1 - size / 2)" :y="beatToTime(bpms, beat) * viewBox.ups - 0.25" :width="size * 8"
        height="0.5" class="scale-stroke" stroke-width="0.05" stroke="#fff" fill="#ff0" />
</template>
