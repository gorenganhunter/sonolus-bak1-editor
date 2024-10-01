import { scaledTimes } from '../..'
import { colors } from '../../../colors'
import { bpms } from '../../../history/bpms'
import { timeScales } from '../../../history/timeScales'
import { settings } from '../../../settings'
import { beatToTime } from '../../../state/integrals/bpms'
import { timeToScaledTime } from '../../../state/integrals/timeScales'
import { clamp, unlerp } from '../../../utils/math'
import { holdConnectionLayout, noteDuration } from '../../note'
import { getDepth } from '../../projection'
import type { VecLike } from '../../Vec'

export const toConnections = (
    beatMin: number,
    beatMax: number,
    color: number,
    [l1, r1]: [VecLike, VecLike],
    [l2, r2]: [VecLike, VecLike],
    [l3, r3]: [VecLike, VecLike],
    [l4, r4]: [VecLike, VecLike],
) => {
    const tMin = timeToScaledTime(timeScales.value, beatToTime(bpms.value, beatMin))
    const zMin = clamp(unlerp(tMin - noteDuration.value, tMin, scaledTimes.value.min))

    const tMax = timeToScaledTime(timeScales.value, beatToTime(bpms.value, beatMax))
    const zMax = clamp(unlerp(tMax - noteDuration.value, tMax, scaledTimes.value.min))

    const polygon = {
        fill: colors[color],
        'fill-opacity': (0.5 * settings.previewConnectionAlpha) / 100,
    }
    const time = (tMin + tMax) / 2

    return [
        {
            polygon: {
                ...polygon,
                points: holdConnectionLayout(l1, r1, zMin, zMax),
            },
            time,
            depth: getDepth([l1, r1]),
        },
        {
            polygon: {
                ...polygon,
                points: holdConnectionLayout(l2, r2, zMin, zMax),
            },
            time,
            depth: getDepth([l2, r2]),
        },
        {
            polygon: {
                ...polygon,
                points: holdConnectionLayout(l3, r3, zMin, zMax),
            },
            time,
            depth: getDepth([l3, r3]),
        },
        {
            polygon: {
                ...polygon,
                points: holdConnectionLayout(l4, r4, zMin, zMax),
            },
            time,
            depth: getDepth([l4, r4]),
        },
    ]
}
