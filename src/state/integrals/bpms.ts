import { findIntegral, integrate, type Integral } from '.'
import { type Chart, type ValueObject } from '../../chart'

export type BpmIntegral = Integral

export const createBpms = (chart: Chart) => calculateBpms(chart.bpms.map(toBpmIntegral))

export const calculateBpms = (bpms: BpmIntegral[]) => integrate(bpms.sort((a, b) => a.x - b.x))

export const toBpmIntegral = (object: ValueObject): BpmIntegral => ({
    x: object.beat,
    y: 0,
    s: 60 / object.value,
})

export const beatToTime = (bpms: Integral[], beat: number) => {
    const { x, y, s } = findIntegral(bpms, 'x', beat)

    return y + (beat - x) * s
}

export const timeToBeat = (bpms: Integral[], time: number) => {
    const { x, y, s } = findIntegral(bpms, 'y', time)

    return x + (time - y) / s
}
