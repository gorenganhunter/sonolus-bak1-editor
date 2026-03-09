<script setup lang="ts">
import type { JudgeMoveXEventConnectionEntity } from '../../../../state/entities/events/connections/judgeMoveX'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorJudgeMoveXEventConnectionSegment from './segment/LevelEditorJudgeMoveXEventConnectionSegment.vue'

defineProps<JudgeMoveXEventConnectionEntity>()
</script>

<template>
    <g stroke="#db00db" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorJudgeMoveXEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
