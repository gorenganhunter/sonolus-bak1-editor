<script setup lang="ts">
import type { MoveYEventConnectionEntity } from '../../../../state/entities/events/connections/moveY'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorMoveYEventConnectionSegment from './segment/LevelEditorMoveYEventConnectionSegment.vue'

defineProps<MoveYEventConnectionEntity>()
</script>

<template>
    <g stroke="#0ff" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorMoveYEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
