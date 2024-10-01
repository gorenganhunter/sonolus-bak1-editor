import { scaledTimes } from '../..'
import { colors } from '../../../colors'
import { bpms } from '../../../history/bpms'
import { timeScales } from '../../../history/timeScales'
import { beatToTime } from '../../../state/integrals/bpms'
import { timeToScaledTime } from '../../../state/integrals/timeScales'
import { unlerp } from '../../../utils/math'
import { noteDuration } from '../../note'
import { getDepth } from '../../projection'
import type { VecLike } from '../../Vec'

export const toJoint = (
    beat: number,
    color: number,
    p1: VecLike,
    p2: VecLike,
    p3: VecLike,
    p4: VecLike,
    layout: (p1: VecLike, p2: VecLike, p3: VecLike, p4: VecLike, z: number) => string,
) => {
    const time = timeToScaledTime(timeScales.value, beatToTime(bpms.value, beat))
    const z = unlerp(time - noteDuration.value, time, scaledTimes.value.min)

    return {
        polygon: {
            points: layout(p1, p2, p3, p4, z),
            stroke: 'white',
            fill: colors[color],
            'fill-opacity': '0.5',
        },
        time,
        depth: getDepth([p1, p2, p3, p4]),
    }
}
