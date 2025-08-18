import { computed } from 'vue'
import { settings } from '../settings'
import type { VecLike } from './Vec'
import { toPoints } from './polygon'
import { transform } from './projection'
import { remap } from '../utils/math'

const h = 0.02

export const noteDuration = computed(
    () => settings.previewNoteSpeed
    //    () => 10 / Math.pow(1.03, (settings.previewNoteSpeed - 1) / 0.1),
)

const d0 = 12
const d1 = 1

export const approach = (fromTime: number, toTime: number, now: number) =>
    now <= toTime
        ? 1 / remap(fromTime, toTime, d0, d1, now)
        : Math.min(1.5, remap(toTime, toTime + (toTime - fromTime), d1, d0, now))

export const tapNoteLayout = (l: VecLike, r: VecLike, z: number) =>
    toPoints(transform(l, z + h), transform(l, z - h), transform(r, z - h), transform(r, z + h))

export const singleHoldNoteLayout = (
    lb: VecLike,
    rb: VecLike,
    lt: VecLike,
    rt: VecLike,
    z: number,
) => toPoints(transform(lb, z), transform(lt, z), transform(rt, z), transform(rb, z))

export const doubleHoldNoteLayout = (
    ll: VecLike,
    lr: VecLike,
    rl: VecLike,
    rr: VecLike,
    z: number,
) => toPoints(transform(lr, z), transform(ll, z), transform(rr, z), transform(rl, z))

export const holdConnectionLayout = (l: VecLike, r: VecLike, zMin: number, zMax: number) =>
    toPoints(transform(l, zMin), transform(l, zMax), transform(r, zMax), transform(r, zMin))
