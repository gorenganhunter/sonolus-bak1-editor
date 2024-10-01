import { toConnections } from '.'
import { beats, keys } from '../..'
import { cullEntities } from '../../../history/store'
import { rotate, shift } from '../../events'
import { getLane } from '../../lane'

export const getSingleHoldNoteConnections = () =>
    [...cullEntities('singleHoldNoteConnection', keys.value.min, keys.value.max)]
        .filter(({ min, max }) => max.beat > beats.value.min && min.beat < beats.value.max)
        .flatMap(({ min, max }) => {
            const [lb, rb] = getLane(min.lane, 1, shift.value, rotate.value)
            const [lt] = getLane(min.lane, min.scaleL, shift.value, rotate.value)
            const [, rt] = getLane(min.lane, min.scaleR, shift.value, rotate.value)

            return toConnections(
                min.beat,
                max.beat,
                min.color,
                [lb, lt],
                [lt, rt],
                [rt, rb],
                [rb, lb],
            )
        })
