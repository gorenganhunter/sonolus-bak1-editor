<script setup lang="ts">
import { useId } from 'vue'
import type { RotateEventConnectionEntity } from '../../../../state/entities/events/connections/rotate'
import { viewBox } from '../../../view'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorRotateEventConnectionSegment from './segment/LevelEditorRotateEventConnectionSegment.vue'

defineProps<RotateEventConnectionEntity>()

const id = useId()
</script>

<template>
    <g :clip-path="`url(#${id})`" stroke="#0f0" stroke-opacity="0.5">
        <defs>
            <clipPath :id>
                <rect :x="-4" :y="viewBox.t" width="8" :height="viewBox.h" />
            </clipPath>
        </defs>
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorRotateEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
