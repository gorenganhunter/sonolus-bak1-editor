import { toJoint } from '.'
import { beats, keys } from '../..'
import { cullEntities } from '../../../history/store'
import { rotate, shift } from '../../events'
import { getLane } from '../../lane'
import { singleHoldNoteLayout } from '../../note'

export const getSingleHoldNoteJoints = () =>
    [...cullEntities('singleHoldNoteJoint', keys.value.min, keys.value.max)]
        .filter(({ beat }) => beat >= beats.value.min && beat < beats.value.max)
        .map(({ beat, color, lane, scaleL, scaleR }) => {
            const [lb, rb] = getLane(lane, 1, shift.value, rotate.value)
            const [lt] = getLane(lane, scaleL, shift.value, rotate.value)
            const [, rt] = getLane(lane, scaleR, shift.value, rotate.value)

            return toJoint(beat, color, lb, rb, lt, rt, singleHoldNoteLayout)
        })
