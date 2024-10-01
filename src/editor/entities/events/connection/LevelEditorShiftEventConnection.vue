<script setup lang="ts">
import type { ShiftEventConnectionEntity } from '../../../../state/entities/events/connections/shift'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorShiftEventConnectionSegment from './segment/LevelEditorShiftEventConnectionSegment.vue'

defineProps<ShiftEventConnectionEntity>()
</script>

<template>
    <g stroke="#f00" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorShiftEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
