import { toPoints } from './polygon'
import { transform } from './projection'
import { Vec } from './Vec'

export const getLane = (lane: number, scale: number, shift: number, rotate: number) => {
    const m = new Vec(0, 0)
    const a = ((rotate) / 2) * Math.PI

    return [
        m.translate(-1, 0).mul(scale).rotate(a),
        m.translate(1, 0).mul(scale).rotate(a),
    ] as const
}

export const getLaneCenter = (lane: number, scale: number, shift: number, rotate: number) => {
    const m = new Vec(0, -1)
    const y = -shift * 0.2
    const a = ((lane + rotate) / 2) * Math.PI

    return m.mul(scale).translate(0, y).rotate(a)
}

export const laneLayout = (l: Vec, r: Vec) =>
    toPoints(transform(l, -1), transform(l, 1), transform(r, 1), transform(r, -1))
