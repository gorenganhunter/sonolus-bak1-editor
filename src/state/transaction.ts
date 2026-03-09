import type { State } from '.'
import { view } from '../editor/view'
import type { Entity } from './entities'
import type { SlideId } from './entities/slides'
import { calculateBpms, type BpmIntegral } from './integrals/bpms'
import { calculateTimeScales, type TimeScaleIntegral } from './integrals/timeScales'
import { rebuildSlide } from './mutations/slides'

export type Transaction = ReturnType<typeof createTransaction>

export const createTransaction = (state: State) => {
    const grid = createMapObjectTransaction(state.store.grid)
    const eventRanges = {
        ...state.store.eventRanges
    }
    const stages = [...state.store.stages]
    const slides = createMapObjectTransaction(state.store.slides)
    const dirtySlideIds = new Set<SlideId>()
    // const holdNoteRanges = createMapObjectTransaction(state.store.holdNoteRanges)

    let bpms: BpmIntegral[] | undefined
    let timeScales: TimeScaleIntegral[] | undefined

    return {
        store: {
            grid: grid.accessor,
            slides: slides.accessor,
            eventRanges,
            stages,
            markDirty(slideId: SlideId) {
                dirtySlideIds.add(slideId)
            },
            // holdNoteRanges: holdNoteRanges.accessor,
        },

        get bpms() {
            return (bpms ??= [...state.bpms])
        },
        get timeScales() {
            return (timeScales ??= [...state.timeScales])
        },

        commit(selectedEntities: Entity[]): State {
            if (bpms) bpms = calculateBpms(bpms)
            if (bpms || timeScales)
                timeScales = calculateTimeScales(bpms ?? state.bpms, timeScales ?? [...state.timeScales.filter(({ stage }) => stage === view.stage)])

            for (const slideId of dirtySlideIds) {
                rebuildSlide(this.store, slideId, selectedEntities)
            }

            return {
                ...state,

                store: {
                    grid: {
                        ...state.store.grid,
                        ...grid.value,
                    },
                    eventRanges,
                    slides: {
                        ...state.store.slides,
                        ...slides.value,
                    },
                    stages
                    // holdNoteRanges: {
                    //     ...state.store.holdNoteRanges,
                    //     ...holdNoteRanges.value,
                    // },
                },

                bpms: bpms ?? state.bpms,
                timeScales: timeScales ?? state.timeScales,

                selectedEntities
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
