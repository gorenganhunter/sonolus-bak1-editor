import { lerp, remap } from '../utils/math'
import type { VecLike } from './Vec'

const getT = (zoom: number) => lerp(0.6, 1, zoom)

const getS = (zoom: number) => lerp(0.75, 1.35, zoom)

export const getTransform = (zoom: number) => {
    const t = getT(zoom)
    const s = getS(zoom)

    return `scale(${s}, ${s}) translate(0, ${t})`
}

export const transform = (vec: VecLike, z: number) => {
    const w = remap(0, 1, 12, 1, z)

    return {
        x: vec.x / 1,
        y: (vec.y - z - 0.5) / 1,
    }
}

export const getDepth = (vecs: VecLike[]) => {
    let x = 0
    let y = 0
    for (const vec of vecs) {
        x += vec.x
        y += vec.y
    }

    x /= vecs.length
    y /= vecs.length
    y -= 0.5

    return x * x + y * y
}
