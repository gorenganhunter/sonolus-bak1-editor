<script setup lang="ts">
import { useId } from 'vue'
import type { SpawnRotateEventConnectionEntity } from '../../../../state/entities/events/connections/spawnRotate'
import { viewBox } from '../../../view'
import LevelEditorEventConnection from './LevelEditorEventConnection.vue'
import LevelEditorSpawnRotateEventConnectionSegment from './segment/LevelEditorSpawnRotateEventConnectionSegment.vue'

defineProps<SpawnRotateEventConnectionEntity>()

const id = useId()
</script>

<template>
    <g :clip-path="`url(#${id})`" stroke="#00db58" stroke-opacity="0.5">
        <defs>
            <clipPath :id>
                <rect :x="-4" :y="viewBox.t" width="8" :height="viewBox.h" />
            </clipPath>
        </defs>
        <LevelEditorEventConnection v-slot="{ segment }" v-bind="$props">
            <LevelEditorSpawnRotateEventConnectionSegment :entity="$props" :segment />
        </LevelEditorEventConnection>
    </g>
</template>
