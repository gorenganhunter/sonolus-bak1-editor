import { findIntegral, integrate, type Integral } from '.'
import type { Chart, StageValueObject, ValueObject } from '../../chart'
import { beatToTime, type BpmIntegral } from './bpms'

export type TimeScaleIntegral = Integral & {
    beat: number
    stage: number
}

export const createTimeScales = (chart: Chart, bpms: BpmIntegral[]) => {
    let map: TimeScaleIntegral[] = [];
    [...new Set(chart.timeScales.map(t => t.stage))].forEach(st => {
        map.push(...calculateTimeScales(bpms, chart.timeScales.filter(t => t.stage === st).map(toTimeScaleIntegral)))
    })
    return map
}

export const calculateTimeScales = (bpms: BpmIntegral[], timeScales: TimeScaleIntegral[]) =>
    integrate(
        timeScales
            .sort((a, b) => a.beat - b.beat)
            .map(
                (timeScale): TimeScaleIntegral => ({
                    ...timeScale,
                    x: beatToTime(bpms, timeScale.beat),
                }),
            ),
    )

export const toTimeScaleIntegral = (object: StageValueObject): TimeScaleIntegral => ({
    beat: object.beat,
    x: 0,
    y: 0,
    s: object.value,
    stage: object.stage
})

export const timeToScaledTime = (timeScales: TimeScaleIntegral[], time: number) => {
    const { x, y, s } = findIntegral(timeScales, 'x', time)

    return y + (time - x) * s
}

export const scaledTimeToTime = (timeScales: TimeScaleIntegral[], scaledTime: number) => {
    const { x, y, s } = findIntegral(timeScales, 'y', scaledTime)

    return x + (scaledTime - y) / s
}
