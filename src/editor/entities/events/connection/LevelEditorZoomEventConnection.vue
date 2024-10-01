<script setup lang="ts">
import type { ZoomEventConnectionEntity } from '../../../../state/entities/events/connections/zoom'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorZoomEventConnectionSegment from './segment/LevelEditorZoomEventConnectionSegment.vue'

defineProps<ZoomEventConnectionEntity>()
</script>

<template>
    <g stroke="#00f" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorZoomEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
