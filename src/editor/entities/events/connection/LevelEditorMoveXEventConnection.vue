<script setup lang="ts">
import type { MoveXEventConnectionEntity } from '../../../../state/entities/events/connections/moveX'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorMoveXEventConnectionSegment from './segment/LevelEditorMoveXEventConnectionSegment.vue'

defineProps<MoveXEventConnectionEntity>()
</script>

<template>
    <g stroke="#ff0" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorMoveXEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
