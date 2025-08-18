import { computed, ref } from 'vue'
import { view } from '../view'
import { eraser } from './eraser'
import { rotateEvent } from './events/rotate'
import { paste } from './paste'
import { select } from './select'
import { tapNote } from './tapNote'
import { bpm } from './values/bpm'
import { timeScale } from './values/timeScale'
import { flickNote } from './flickNote'
import { dragNote } from './dragNote'
import { holdNote } from './holdNote'
import { resizeEvent } from './events/resize'
import { moveYEvent } from './events/moveY'
import { moveXEvent } from './events/moveX'
import { transparentEvent } from './events/transparent'

export type Tool = {
    hover?: (x: number, y: number, isShift: boolean) => void | Promise<void>

    tap?: (x: number, y: number, isShift: boolean) => void | Promise<void>

    dragStart?: (x: number, y: number, isShift: boolean) => boolean
    dragUpdate?: (x: number, y: number, isShift: boolean) => void
    dragEnd?: (x: number, y: number, isShift: boolean) => void | Promise<void>
}

export const tools = {
    select,
    eraser,
    paste,

    tapNote,
    dragNote,
    flickNote,
    holdNote,

    rotateEvent,
    resizeEvent,
    transparentEvent,
    moveXEvent,
    moveYEvent,

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
