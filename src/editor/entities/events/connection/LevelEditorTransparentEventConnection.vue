<script setup lang="ts">
import type { TransparentEventConnectionEntity } from '../../../../state/entities/events/connections/transparent'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorTransparentEventConnectionSegment from './segment/LevelEditorTransparentEventConnectionSegment.vue'

defineProps<TransparentEventConnectionEntity>()
</script>

<template>
    <g stroke="#4d4d4d" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorTransparentEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
