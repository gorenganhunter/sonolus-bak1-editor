<script setup lang="ts">
import type { SpawnMoveYEventConnectionEntity } from '../../../../state/entities/events/connections/spawnMoveY'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorSpawnMoveYEventConnectionSegment from './segment/LevelEditorSpawnMoveYEventConnectionSegment.vue'

defineProps<SpawnMoveYEventConnectionEntity>()
</script>

<template>
    <g stroke="#db6e00" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorSpawnMoveYEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
