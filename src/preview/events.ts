import { computed } from 'vue'
import { beats, scaledTimes } from '.'
import { easeValue } from '../editor/ease'
import { bpms } from '../history/bpms'
import { store } from '../history/store'
import { timeScales } from '../history/timeScales'
import type { EventConnectionEntityType } from '../state/entities/events/connections'
import type { EventJointEntityType } from '../state/entities/events/joints'
import { beatToTime, timeToBeat } from '../state/integrals/bpms'
import { timeToScaledTime } from '../state/integrals/timeScales'
import { getInStoreGrid } from '../state/store/grid'
import { lerp, unlerp } from '../utils/math'
import { view } from '../editor/view'

const getEvent = (jointType: EventJointEntityType, connectionType: EventConnectionEntityType, stage: number) => {
    const current = computed(() => {
        const connection = getInStoreGrid(store.value.grid, connectionType, timeToBeat(bpms.value, view.cursorTime))?.find(
            (entity) => entity.stage === stage && beats(stage).value.min >= entity.min.beat && beats(stage).value.min <= entity.max.beat,
        )
        if (!connection) return

        return {
            min: {
                scaledTime: timeToScaledTime(
                    timeScales.value.filter(ts => ts.stage === stage),
                    beatToTime(bpms.value, connection.min.beat),
                ),
                value: connection.min.value,
            },
            max: {
                scaledTime: timeToScaledTime(
                    timeScales.value.filter(ts => ts.stage === stage),
                    beatToTime(bpms.value, connection.max.beat),
                ),
                value: connection.max.value,
            },
            ease: connection.min.ease,
        }
    })

    return computed(() => {
        if (!current.value) {
            let evs: any[] = []
            store.value.grid[jointType].forEach(b => [...b].forEach(a => { if (a.stage === stage) evs.push(a) }))
            evs = evs.sort((a, b) => a.beat - b.beat)
            const range = evs.length ? { min: evs[0], max: evs[evs.length - 1] } : null
            if (!range) return 0

            return timeToBeat(bpms.value, view.cursorTime) < range.min.beat ? range.min.value : range.max.value
        }

        const { min, max, ease } = current.value

        const s = unlerp(min.scaledTime, max.scaledTime, scaledTimes(stage).value.min)
        return lerp(min.value, max.value, easeValue(s, ease))
    })
}

export const rotate = (stage: number) => getEvent('rotateEventJoint', 'rotateEventConnection', stage)
export const resize = (stage: number) => getEvent('resizeEventJoint', 'resizeEventConnection', stage)
export const transparent = (stage: number) => getEvent('transparentEventJoint', 'transparentEventConnection', stage)
export const moveX = (stage: number) => getEvent('moveXEventJoint', 'moveXEventConnection', stage)
export const moveY = (stage: number) => getEvent('moveYEventJoint', 'moveYEventConnection', stage)
