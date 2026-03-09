<script setup lang="ts">
import type { NoteHEventConnectionEntity } from '../../../../state/entities/events/connections/noteH'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorNoteHEventConnectionSegment from './segment/LevelEditorNoteHEventConnectionSegment.vue'

defineProps<NoteHEventConnectionEntity>()
</script>

<template>
    <g stroke="#00dbdb" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorNoteHEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
