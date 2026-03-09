<script setup lang="ts">
import type { SpawnMoveXEventConnectionEntity } from '../../../../state/entities/events/connections/spawnMoveX'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorSpawnMoveXEventConnectionSegment from './segment/LevelEditorSpawnMoveXEventConnectionSegment.vue'

defineProps<SpawnMoveXEventConnectionEntity>()
</script>

<template>
    <g stroke="#db0000" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorSpawnMoveXEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
