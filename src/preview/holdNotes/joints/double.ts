import { toJoint } from '.'
import { beats, keys } from '../..'
import { cullEntities } from '../../../history/store'
import { rotate, shift } from '../../events'
import { getLane } from '../../lane'
import { doubleHoldNoteLayout } from '../../note'

export const getDoubleHoldNoteJoints = () =>
    [...cullEntities('doubleHoldNoteJoint', keys.value.min, keys.value.max)]
        .filter(({ beat }) => beat >= beats.value.min && beat < beats.value.max)
        .map(({ beat, color, laneL, laneR }) => {
            const [ll, lr] = getLane(laneL, 1, shift.value, rotate.value)
            const [rl, rr] = getLane(laneR, 1, shift.value, rotate.value)

            return toJoint(beat, color, ll, lr, rl, rr, doubleHoldNoteLayout)
        })
