import { hitEntities } from '../../history/store'
import type { Entity } from '../../state/entities'
import { view, xToLane, yToTime, type Selection } from '../view'

export const hitEntitiesAtPoint = (x: number, y: number) =>
    hitEntities(xToLane(x + 10), xToLane(x - 10), yToTime(y + 10), yToTime(y - 10)).filter(
        isVisible,
    )

export const hitEntitiesInSelection = (selection: Selection) =>
    hitEntities(selection.laneMin, selection.laneMax, selection.timeMin, selection.timeMax).filter(
        isVisible,
    )

export const toSelection = (startLane: number, startTime: number, x: number, y: number) => {
    let laneMin = startLane
    let timeMin = startTime
    let laneMax = xToLane(x)
    let timeMax = yToTime(y)

    if (laneMin > laneMax) [laneMin, laneMax] = [laneMax, laneMin]
    if (timeMin > timeMax) [timeMin, timeMax] = [timeMax, timeMin]

    return {
        laneMin,
        laneMax,
        timeMin,
        timeMax,
    }
}

const isVisible = (entity: Entity) => view.visibilities[entity.type]
