import type { VecLike } from './Vec'

export const toPoints = (p1: VecLike, p2: VecLike, p3: VecLike, p4: VecLike) =>
    `${p1.x} ${p1.y} ${p2.x} ${p2.y} ${p3.x} ${p3.y} ${p4.x} ${p4.y}`
