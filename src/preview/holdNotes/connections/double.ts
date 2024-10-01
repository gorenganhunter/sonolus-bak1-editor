import { toConnections } from '.'
import { beats, keys } from '../..'
import { cullEntities } from '../../../history/store'
import { rotate, shift } from '../../events'
import { getLane } from '../../lane'

export const getDoubleHoldNoteConnections = () =>
    [...cullEntities('doubleHoldNoteConnection', keys.value.min, keys.value.max)]
        .filter(({ min, max }) => max.beat > beats.value.min && min.beat < beats.value.max)
        .flatMap(({ min, max }) => {
            const [ll, lr] = getLane(min.laneL, 1, shift.value, rotate.value)
            const [rl, rr] = getLane(min.laneR, 1, shift.value, rotate.value)

            return toConnections(
                min.beat,
                max.beat,
                min.color,
                [ll, rr],
                [rr, rl],
                [rl, lr],
                [lr, ll],
            )
        })
