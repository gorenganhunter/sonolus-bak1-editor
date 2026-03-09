<script setup lang="ts">
import { bpms } from '../../../history/bpms'
import type { NoteEntity } from '../../../state/entities/slides/note'
import { beatToTime } from '../../../state/integrals/bpms'
import { viewBox, view } from '../../view'
import { lerp } from "../../../utils/math"

defineProps<NoteEntity>()
</script>

<template>
    <rect x="0" y="0" :width="size * 8"
        height="0.5" class="scale-stroke" stroke-width="0.05" stroke="#fff" fill="#0f0" />
</template>
