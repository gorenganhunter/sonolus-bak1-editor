import type { State } from '.'
import { calculateBpms, type BpmIntegral } from './integrals/bpms'
import { calculateTimeScales, type TimeScaleIntegral } from './integrals/timeScales'

export type Transaction = ReturnType<typeof createTransaction>

export const createTransaction = (state: State) => {
    const grid = createMapObjectTransaction(state.store.grid)
    const eventRanges = { ...state.store.eventRanges }
    const holdNoteRanges = createMapObjectTransaction(state.store.holdNoteRanges)

    let bpms: BpmIntegral[] | undefined
    let timeScales: TimeScaleIntegral[] | undefined

    return {
        store: {
            grid: grid.accessor,
            eventRanges,
            holdNoteRanges: holdNoteRanges.accessor,
        },

        get bpms() {
            return (bpms ??= [...state.bpms])
        },
        get timeScales() {
            return (timeScales ??= [...state.timeScales])
        },

        commit: (): State => {
            if (bpms) bpms = calculateBpms(bpms)
            if (bpms || timeScales)
                timeScales = calculateTimeScales(bpms ?? state.bpms, timeScales ?? state.timeScales)

            return {
                ...state,

                store: {
                    grid: {
                        ...state.store.grid,
                        ...grid.value,
                    },
                    eventRanges,
                    holdNoteRanges: {
                        ...state.store.holdNoteRanges,
                        ...holdNoteRanges.value,
                    },
                },

                bpms: bpms ?? state.bpms,
                timeScales: timeScales ?? state.timeScales,
            }
        },
    }
}

const createMapObjectTransaction = <T extends Record<string, Map<unknown, unknown>>>(object: T) => {
    const value: Record<string, Map<unknown, unknown>> = {}

    return {
        accessor: Object.defineProperties(
            {},
            Object.fromEntries(
                Object.entries(object).map(([k, v]) => [
                    k,
                    {
                        get: () => (value[k] ??= new Map(v)),
                    },
                ]),
            ),
        ) as T,

        value: value as Partial<T>,
    }
}
