<script lang="ts">
const layers = {
    timeScale: 0,
    bpm: 1,

    zoomEventConnection: 10,
    zoomEventJoint: 11,

    shiftEventConnection: 20,
    shiftEventJoint: 21,

    rotateEventConnection: 30,
    rotateEventJoint: 31,

    tapNote: 40,

    singleHoldNoteConnection: 50,
    singleHoldNoteJoint: 51,

    doubleHoldNoteConnection: 60,
    doubleHoldNoteJoint: 61,
}

const infinities = [
    ['rotateEventConnection', LevelEditorRotateEventInfinity] as const,
    ['shiftEventConnection', LevelEditorShiftEventInfinity] as const,
    ['zoomEventConnection', LevelEditorZoomEventInfinity] as const,
]
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { components } from '.'
import { keys } from '..'
import { selectedEntities } from '../../history/selectedEntities'
import { cullAllEntities } from '../../history/store'
import { view } from '../view'
import LevelEditorRotateEventInfinity from './events/infinity/LevelEditorRotateEventInfinity.vue'
import LevelEditorShiftEventInfinity from './events/infinity/LevelEditorShiftEventInfinity.vue'
import LevelEditorZoomEventInfinity from './events/infinity/LevelEditorZoomEventInfinity.vue'

const sortedInfinities = computed(() =>
    infinities.sort(([a], [b]) => +view.visibilities[a] - +view.visibilities[b]),
)

const culledEntities = computed(() => cullAllEntities(keys.value.min, keys.value.max))

const visibleEntities = computed(() =>
    [...culledEntities.value].sort(
        (a, b) =>
            +selectedEntities.value.includes(a) - +selectedEntities.value.includes(b) ||
            +view.visibilities[a.type] - +view.visibilities[b.type] ||
            layers[a.type] - layers[b.type] ||
            b.beat - a.beat,
    ),
)
</script>

<template>
    <component
        :is="component"
        v-for="[type, component] in sortedInfinities"
        :key="type"
        :opacity="view.visibilities[type] ? 1 : 0.25"
    />

    <component
        :is="components[entity.type]"
        v-for="entity in visibleEntities"
        :key="entity as never"
        v-bind="entity"
        :opacity="selectedEntities.includes(entity) || view.visibilities[entity.type] ? 1 : 0.25"
    />
</template>
