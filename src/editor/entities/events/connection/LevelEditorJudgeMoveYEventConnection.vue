<script setup lang="ts">
import type { JudgeMoveYEventConnectionEntity } from '../../../../state/entities/events/connections/judgeMoveY'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorJudgeMoveYEventConnectionSegment from './segment/LevelEditorJudgeMoveYEventConnectionSegment.vue'

defineProps<JudgeMoveYEventConnectionEntity>()
</script>

<template>
    <g stroke="#5800db" stroke-opacity="0.5">
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorJudgeMoveYEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
