import type { Chart } from '../chart'
import type { Bgm } from './bgm'
import type { Entity } from './entities'
import { createBpms, type BpmIntegral } from './integrals/bpms'
import { createTimeScales, type TimeScaleIntegral } from './integrals/timeScales'
import type { Store } from './store'
import { createStore } from './store/creates'

export type State = {
    bgm: Bgm
    store: Store
    bpms: BpmIntegral[]
    timeScales: TimeScaleIntegral[]

    selectedEntities: Entity[]
}

export const createState = (chart: Chart, offset: number): State => {
    const bpms = createBpms(chart)

    return {
        bgm: { offset },
        store: createStore(chart),
        bpms,
        timeScales: createTimeScales(chart, bpms),

        selectedEntities: [],
    }
}
