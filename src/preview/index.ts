import { computed } from 'vue'
import { view } from '../editor/view'
import { bpms } from '../history/bpms'
import { timeScales } from '../history/timeScales'
import { timeToBeat } from '../state/integrals/bpms'
import { scaledTimeToTime, timeToScaledTime } from '../state/integrals/timeScales'
import { maxBeatToKey, minBeatToKey } from '../state/store/grid'
import { computedRange } from '../utils/range'
import { noteDuration } from './note'

export const scaledTimes = (stage: number) => computed(() => {
    const min = timeToScaledTime(timeScales.value.filter(t => t.stage === stage), view.cursorTime)

    return {
        min,
        max: min + noteDuration.value,
    }
})

export const times = (stage: number) => computed(() => ({
    min: view.cursorTime,
    max: scaledTimeToTime(timeScales.value.filter(t => t.stage === stage), scaledTimes(stage).value.max),
}))

export const beats = (stage: number) => computed(() => ({
    min: timeToBeat(bpms.value, view.cursorTime),
    max: timeToBeat(bpms.value, times(stage).value.max),
}))

export const keys = computedRange(() => ({
    min: minBeatToKey(timeToBeat(bpms.value, view.cursorTime)),
    max: 1000//maxBeatToKey(beats.value.max),
}))
