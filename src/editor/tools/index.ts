import { computed, ref, type Component } from 'vue'
import type { Modifiers } from '../controls/gestures/pointer'
import { view } from '../view'
import { eraser } from './eraser'
import { paste } from './paste'
import { select } from './select'
import { note } from './note'
import { slide } from './slide'
import { bpm } from './values/bpm'
import { timeScale } from './values/timeScale'
import { judgeResizeEvent } from './events/judgeResize'
import { judgeRotateEvent } from './events/judgeRotate'
import { judgeMoveXEvent } from './events/judgeMoveX'
import { judgeMoveYEvent } from './events/judgeMoveY'
import { spawnResizeEvent } from './events/spawnResize'
import { spawnRotateEvent } from './events/spawnRotate'
import { spawnMoveXEvent } from './events/spawnMoveX'
import { spawnMoveYEvent } from './events/spawnMoveY'
import { transparentEvent } from './events/transparent'
import { noteHEvent } from './events/noteH'
import { brush } from './brush'

export type Tool = {
    sidebar?: Component

    hover?: (x: number, y: number, modifiers: Modifiers) => void | Promise<void>

    tap?: (x: number, y: number, modifiers: Modifiers) => void | Promise<void>

    dragStart?: (x: number, y: number, modifiers: Modifiers) => boolean
    dragUpdate?: (x: number, y: number, modifiers: Modifiers) => void
    dragEnd?: (x: number, y: number, modifiers: Modifiers) => void | Promise<void>
}

export const tools = {
    select,
    eraser,
    paste,
    brush,

    note,
    slide,

    judgeRotateEvent,
    judgeResizeEvent,
    judgeMoveXEvent,
    judgeMoveYEvent,
    spawnRotateEvent,
    spawnResizeEvent,
    spawnMoveXEvent,
    spawnMoveYEvent,
    transparentEvent,
    noteHEvent,

    bpm,
    timeScale,
}

export type ToolName = keyof typeof tools

export const toolName = ref<ToolName>('select')

export const tool = computed(() => tools[toolName.value])

export const switchToolTo = (tool: ToolName) => {
    toolName.value = tool

    view.entities = {
        hovered: [],
        creating: [],
    }
}
