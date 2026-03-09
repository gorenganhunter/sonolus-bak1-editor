<script setup lang="ts">
import { useId } from 'vue'
import type { JudgeRotateEventConnectionEntity } from '../../../../state/entities/events/connections/judgeRotate'
import { viewBox } from '../../../view'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorJudgeRotateEventConnectionSegment from './segment/LevelEditorJudgeRotateEventConnectionSegment.vue'

defineProps<JudgeRotateEventConnectionEntity>()

const id = useId()
</script>

<template>
    <g :clip-path="`url(#${id})`" stroke="#006edb" stroke-opacity="0.5">
        <defs>
            <clipPath :id>
                <rect :x="-4" :y="viewBox.t" width="8" :height="viewBox.h" />
            </clipPath>
        </defs>
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorJudgeRotateEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
