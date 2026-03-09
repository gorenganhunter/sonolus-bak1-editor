<script setup lang="ts">
import type { SpawnResizeEventConnectionEntity } from '../../../../state/entities/events/connections/spawnResize'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorSpawnResizeEventConnectionSegment from './segment/LevelEditorSpawnResizeEventConnectionSegment.vue'

defineProps<SpawnResizeEventConnectionEntity>()
</script>

<template>
    <g stroke="#dbdb00" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorSpawnResizeEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
