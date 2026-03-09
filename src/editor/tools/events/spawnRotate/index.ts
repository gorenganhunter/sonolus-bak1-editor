import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { toSpawnRotateEventJointEntity } from '../../../../state/entities/events/joints/spawnRotate'
import {
    addSpawnRotateEventJoint,
    removeSpawnRotateEventJoint,
} from '../../../../state/mutations/events/spawnRotate'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import SpawnRotateEventPropertiesModal from './SpawnRotateEventPropertiesModal.vue'
import SpawnRotateEventSidebar from './SpawnRotateEventSidebar.vue'

export type DefaultSpawnRotateEventProperties = {
    ease?: EaseType
}

export let defaultSpawnRotateEventProperties: DefaultSpawnRotateEventProperties = {}

export const setDefaultSpawnRotateEventProperties = (properties: DefaultSpawnRotateEventProperties) => {
    defaultSpawnRotateEventProperties = properties
}

const toValue = (x: number) => {
    let a = align(xToLane(x) * 360 - 180)
    // //console.log(x, a)
    return a
}

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'spawnRotateEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.spawnRotateEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [spawnRotateEvent, editSpawnRotateEventJoint, editSelectedSpawnRotateEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.spawnRotateEvent,
    SpawnRotateEventSidebar,
    () => showModal(SpawnRotateEventPropertiesModal, {}),

    (value, x) => (value - toValue(x)) % 360 === 0,
    (beat, x) => {
        const value = toValue(x)

        const prev = getPrev(beat)
        if (!prev) return value
        // //console.log(prev.value, value)
        return value + Math.floor(prev.value / 360) * 360
    },
    (value, sx, x) => value + align(xToLane(x) * 360) - align(xToLane(sx) * 360),
    () => defaultSpawnRotateEventProperties.ease,

    'spawnRotateEventJoint',
    toSpawnRotateEventJointEntity,
    addSpawnRotateEventJoint,
    removeSpawnRotateEventJoint,
)
