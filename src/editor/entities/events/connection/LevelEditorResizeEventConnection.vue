<script setup lang="ts">
import type { ResizeEventConnectionEntity } from '../../../../state/entities/events/connections/resize'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorResizeEventConnectionSegment from './segment/LevelEditorResizeEventConnectionSegment.vue'

defineProps<ResizeEventConnectionEntity>()
</script>

<template>
    <g stroke="#f00" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorResizeEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
