<script lang="ts">
const layers = {
    timeScale: 0,
    bpm: 1,

    transparentEventConnection: 10,
    transparentEventJoint: 11,

    noteHEventConnection: 12,
    noteHEventJoint: 13,

    spawnMoveXEventConnection: 14,
    spawnMoveXEventJoint: 15,

    spawnMoveYEventConnection: 18,
    spawnMoveYEventJoint: 19,

    spawnResizeEventConnection: 22,
    spawnResizeEventJoint: 23,

    spawnRotateEventConnection: 26,
    spawnRotateEventJoint: 27,

    judgeMoveXEventConnection: 16,
    judgeMoveXEventJoint: 17,

    judgeMoveYEventConnection: 20,
    judgeMoveYEventJoint: 21,

    judgeResizeEventConnection: 24,
    judgeResizeEventJoint: 25,

    judgeRotateEventConnection: 28,
    judgeRotateEventJoint: 29,

    note: 40,
    connector: 39
}

const infinities = [
    ['judgeRotateEventConnection', LevelEditorJudgeRotateEventInfinity] as const,
    ['judgeResizeEventConnection', LevelEditorJudgeResizeEventInfinity] as const,
    ['judgeMoveXEventConnection', LevelEditorJudgeMoveXEventInfinity] as const,
    ['judgeMoveYEventConnection', LevelEditorJudgeMoveYEventInfinity] as const,
    ['spawnRotateEventConnection', LevelEditorSpawnRotateEventInfinity] as const,
    ['spawnResizeEventConnection', LevelEditorSpawnResizeEventInfinity] as const,
    ['spawnMoveXEventConnection', LevelEditorSpawnMoveXEventInfinity] as const,
    ['spawnMoveYEventConnection', LevelEditorSpawnMoveYEventInfinity] as const,
    ['transparentEventConnection', LevelEditorTransparentEventInfinity] as const,
    ['noteHEventConnection', LevelEditorNoteHEventInfinity] as const,
]
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { components } from '.'
import { keys } from '..'
import { selectedEntities } from '../../history/selectedEntities'
import { cullAllEntities } from '../../history/store'
import type { Entity } from '../../state/entities'
import { view } from '../view'
import LevelEditorJudgeRotateEventInfinity from './events/infinity/LevelEditorJudgeRotateEventInfinity.vue'
import LevelEditorJudgeResizeEventInfinity from './events/infinity/LevelEditorJudgeResizeEventInfinity.vue'
import LevelEditorJudgeMoveXEventInfinity from './events/infinity/LevelEditorJudgeMoveXEventInfinity.vue'
import LevelEditorJudgeMoveYEventInfinity from './events/infinity/LevelEditorJudgeMoveYEventInfinity.vue'
import LevelEditorSpawnRotateEventInfinity from './events/infinity/LevelEditorSpawnRotateEventInfinity.vue'
import LevelEditorSpawnResizeEventInfinity from './events/infinity/LevelEditorSpawnResizeEventInfinity.vue'
import LevelEditorSpawnMoveXEventInfinity from './events/infinity/LevelEditorSpawnMoveXEventInfinity.vue'
import LevelEditorSpawnMoveYEventInfinity from './events/infinity/LevelEditorSpawnMoveYEventInfinity.vue'
import LevelEditorTransparentEventInfinity from './events/infinity/LevelEditorTransparentEventInfinity.vue'
import LevelEditorNoteHEventInfinity from './events/infinity/LevelEditorNoteHEventInfinity.vue'

const sortedInfinities = computed(() =>
    infinities.sort(([a], [b]) => +view.visibilities[a] - +view.visibilities[b]),
)

const isEntityVisible = (entity: Entity) => {
//    if (view.stage === undefined) return true

    switch (entity.type) {
        case 'bpm':
            return true
        case 'timeScale':
        case 'note':
            return entity.stage === view.stage
        case 'connector':
            console.log(entity)
            return entity.head.stage === view.stage || entity.tail.stage === view.stage
        default:
            return entity.stage === view.stage
    }
}

const culledEntities = computed(() => cullAllEntities(keys.value.min, keys.value.max))

const visibleEntities = computed(() =>
    [...culledEntities.value].filter(isEntityVisible)
    .sort(
        (a, b) =>
            +selectedEntities.value.includes(a) - +selectedEntities.value.includes(b) ||
            +view.visibilities[a.type] - +view.visibilities[b.type] ||
            layers[a.type] - layers[b.type] ||
            b.beat - a.beat,
    )
)
</script>

<template>
    <component
        :is="component"
        v-for="[type, component] in sortedInfinities"
        :key="type"
        :opacity="view.visibilities[type] ? 1 : 0.25"
    />

    <component :is="components[entity.type]" v-for="entity in visibleEntities" :key="entity as never" v-bind="entity"
        :opacity="selectedEntities.includes(entity) || view.visibilities[entity.type] ? 1 : 0.25" />
</template>
