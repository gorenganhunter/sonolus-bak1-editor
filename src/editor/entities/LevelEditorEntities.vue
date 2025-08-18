<script lang="ts">
const layers = {
    timeScale: 0,
    bpm: 1,

    transparentEventConnection: 20,
    transparentEventJoint: 21,

    moveXEventConnection: 22,
    moveXEventJoint: 23,

    moveYEventConnection: 24,
    moveYEventJoint: 25,

    resizeEventConnection: 27,
    resizeEventJoint: 27,

    rotateEventConnection: 30,
    rotateEventJoint: 31,

    holdConnector: 5,

    dragNote: 40,
    holdNote: 41,
    tapNote: 42,
    flickNote: 43,

    singleHoldNoteConnection: 50,
    singleHoldNoteJoint: 51,

    doubleHoldNoteConnection: 60,
    doubleHoldNoteJoint: 61,
}

const infinities = [
    ['rotateEventConnection', LevelEditorRotateEventInfinity] as const,
    ['resizeEventConnection', LevelEditorResizeEventInfinity] as const,
    ['transparentEventConnection', LevelEditorTransparentEventInfinity] as const,
    ['moveXEventConnection', LevelEditorMoveXEventInfinity] as const,
    ['moveYEventConnection', LevelEditorMoveYEventInfinity] as const,
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
import LevelEditorResizeEventInfinity from './events/infinity/LevelEditorResizeEventInfinity.vue'
import LevelEditorTransparentEventInfinity from './events/infinity/LevelEditorTransparentEventInfinity.vue'
import LevelEditorMoveXEventInfinity from './events/infinity/LevelEditorMoveXEventInfinity.vue'
import LevelEditorMoveYEventInfinity from './events/infinity/LevelEditorMoveYEventInfinity.vue'

const sortedInfinities = computed(() =>
    infinities.sort(([a], [b]) => +view.visibilities[a] - +view.visibilities[b]),
)

const culledEntities = computed(() => cullAllEntities(keys.value.min, keys.value.max))

const visibleEntities = computed(() =>
    [...culledEntities.value,
    ...[...culledEntities.value].filter(a => a.type === "holdNote").map(a => ({ ...a, type: "holdConnector" }))
    ].sort(
        (a, b) =>
            +selectedEntities.value.includes(a) - +selectedEntities.value.includes(b) ||
            +view.visibilities[a.type] - +view.visibilities[b.type] ||
            layers[a.type] - layers[b.type] ||
            b.beat - a.beat,
    )
    .filter(a => (!a.stage && a.stage !== 0) || a.stage === view.stage)
    .filter(a => (a.type !== "tapNote" && a.type !== "holdNote" && a.type !== "dragNote" && a.type !== "holdConnector" && a.type !== "flickNote") || Math.floor(a.lane) === view.side)
)
</script>

<template>
    <component :is="component" v-for="[type, component] in sortedInfinities" :key="type"
        :opacity="view.visibilities[type === 'holdConnector' ? 'holdNote' : type] ? 1 : 0.25" />

    <component :is="components[entity.type]" v-for="entity in visibleEntities" :key="entity as never" v-bind="entity"
        :opacity="selectedEntities.includes(entity) || view.visibilities[entity.type] ? 1 : 0.25" />
</template>
