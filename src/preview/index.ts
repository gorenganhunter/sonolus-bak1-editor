import { computed } from 'vue'
import { view } from '../editor/view'
import { bpms } from '../history/bpms'
import { timeScales } from '../history/timeScales'
import { timeToBeat } from '../state/integrals/bpms'
import { scaledTimeToTime, timeToScaledTime } from '../state/integrals/timeScales'
import { beatToKey } from '../state/store/grid'
import { computedRange } from '../utils/range'
import { noteDuration } from './note'
import { stages } from '../history/stages'

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

export const keys = computedRange(() => {
    // <<<<<<< HEAD

    let range = {
        min: Infinity,
        max: -Infinity
    }

    for (const { id } of stages.value) {
        let { min, max } = beats(id).value
        if (min > max) [min, max] = [max, min]

        if (min < range.min) range.min = min
        if (max > range.max) range.max = max
    }

    // const range = {
    //     min: beatToKey(timeToBeat(bpms.value, view.cursorTime)),
    //     max: 1000//maxBeatToKey(beats.value.max),
    // }
    // =======
    //     min: beatToKey(beats.value.min),
    //     max: beatToKey(beats.value.max),
    // >>>>>>> upstream/main
    return {
        min: beatToKey(range.min),
        max: beatToKey(range.max)
    }
})
