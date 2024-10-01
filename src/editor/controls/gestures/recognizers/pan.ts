import { settings } from '../../../../settings'
import { time } from '../../../../time'
import { scrollViewBy, view } from '../../../view'
import type { Recognizer } from './recognizer'

export const pan = (): Recognizer<2> => {
    const updates: {
        t: number
        dy: number
    }[] = []
    let active:
        | {
              sy: number
              id1: number
              id2: number
          }
        | undefined

    return {
        count: 2,

        recognize([id1, p1], [id2, p2]) {
            if (!p1.isActive || !p2.isActive) return false

            const sy = (p1.sy + p2.sy) / 2
            const y = (p1.y + p2.y) / 2
            if (Math.abs(y - sy) <= 20) return false

            active = {
                sy,
                id1,
                id2,
            }
            return true
        },

        update(pointers) {
            if (!active) return

            const p1 = pointers.get(active.id1)
            if (!p1) return

            const p2 = pointers.get(active.id2)
            if (!p2) return

            const y = (p1.y + p2.y) / 2
            const dy = y - active.sy

            scrollViewBy(dy)

            updates.push({
                t: time.value.now,
                dy,
            })
            active.sy = y
        },

        reset() {
            if (settings.touchScrollInertia) {
                const dy = updates
                    .filter(({ t }) => time.value.now - t <= 0.1)
                    .reduce((sum, { dy }) => sum + dy, 0)
                view.scrolling = {
                    type: 'inertia',
                    value: dy / 0.1,
                }
            }

            updates.length = 0
            active = undefined
        },
    }
}
