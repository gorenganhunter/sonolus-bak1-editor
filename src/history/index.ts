import { computed, ref, shallowReactive, watch } from 'vue'
import type { Chart } from '../chart'
import { parseChart } from '../chart/parse'
import { validateChart } from '../chart/validate'
import { i18n } from '../i18n'
import { parseLevelData } from '../levelData/parse'
import { serializeLevelData } from '../levelData/serialize'
import { showModal } from '../modals'
import ConfirmModal from '../modals/ConfirmModal.vue'
import LoadingModal from '../modals/LoadingModal.vue'
import { settings } from '../settings'
import { createState, type State } from '../state'
import { storageGet, storageRemove, storageSet } from '../storage'
import { timeout } from '../utils/promise'
import { cleanupWaveform } from '../waveform'

const defaultChart: Chart = {
    bpms: [
        {
            beat: 0,
            value: 60,
        },
    ],
    timeScales: [
        {
            beat: 0,
            value: 1,
            stage: 0
        },
    ],
    rectStages: [
        {
            id: 0
        }
    ],
    tapNotes: [],
    dragNotes: [],
    flickNotes: [],
    holdNotes: [],
    moveXEvents: [],
    moveYEvents: [],
    rotateEvents: [],
    resizeEvents: [],
    transparentEvents: []
}

const index = ref(0)

const states = shallowReactive([
    {
        name: () => i18n.value.history.initialize,
        state: createState(defaultChart, 0),
    },
])

addEventListener('beforeunload', (event) => {
    if (index.value) event.preventDefault()
})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const current = computed(() => states[index.value]!)

export const state = computed(() => current.value.state)

export const replaceState = (state: State) => {
    states[index.value] = {
        name: current.value.name,
        state,
    }
}

export const pushState = (name: () => string, state: State) => {
    states.splice(index.value + 1, states.length - index.value - 1, {
        name,
        state,
    })
    index.value++
}

export const undoState = () => {
    if (index.value <= 0) return

    const name = current.value.name
    index.value--
    return name
}

export const redoState = () => {
    if (index.value >= states.length - 1) return

    index.value++
    return current.value.name
}

export const checkState = async () => {
    if (!index.value) return true

    return await showModal(ConfirmModal, {
        title: () => i18n.value.history.changes.title,
        message: () => i18n.value.history.changes.message,
    })
}

export const resetState = (chart?: Chart, offset?: number) => {
    index.value = 0
    states.splice(0, states.length, {
        name: () => i18n.value.history.initialize,
        state: createState(chart ?? defaultChart, offset ?? 0),
    })

    cleanupWaveform()
}

export const useAutoSave = () => {
    let id: number | undefined

    watch(
        () => settings.autoSave && state.value,
        (state) => {
            clearTimeout(id)

            if (!state) {
                storageRemove('autoSave.levelData')
                return
            }

            if (!index.value) return

            id = setTimeout(() => {
                storageSet('autoSave.levelData', serializeLevelData(state.bgm.offset, state.store))
            }, settings.autoSaveDelay * 1000)
        },
    )

    const data = storageGet('autoSave.levelData')
    if (data) {
        void showModal(LoadingModal, {
            title: () => i18n.value.history.autoSave.title,
            async *task() {
                yield () => i18n.value.history.autoSave.importing
                await timeout(50)

                const levelData = parseLevelData(data)

                const chart = parseChart(levelData.entities)
                validateChart(chart)

                resetState(chart, levelData.bgmOffset)
            },
        })
    }
}
