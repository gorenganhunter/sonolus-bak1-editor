<script setup lang="ts">
import type { JudgeResizeEventConnectionEntity } from '../../../../state/entities/events/connections/judgeResize'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorJudgeResizeEventConnectionSegment from './segment/LevelEditorJudgeResizeEventConnectionSegment.vue'

defineProps<JudgeResizeEventConnectionEntity>()
</script>

<template>
    <g stroke="#0000db" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorJudgeResizeEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
