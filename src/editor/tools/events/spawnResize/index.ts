import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToSpawnResizeEventValue, toSpawnResizeEventJointEntity } from '../../../../state/entities/events/joints/spawnResize'
import {
    addSpawnResizeEventJoint,
    removeSpawnResizeEventJoint,
} from '../../../../state/mutations/events/spawnResize'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import SpawnResizeEventPropertiesModal from './SpawnResizeEventPropertiesModal.vue'
import SpawnResizeEventSidebar from './SpawnResizeEventSidebar.vue'

export type DefaultSpawnResizeEventProperties = {
    ease?: EaseType
}

export let defaultSpawnResizeEventProperties: DefaultSpawnResizeEventProperties = {}

export const setDefaultSpawnResizeEventProperties = (properties: DefaultSpawnResizeEventProperties) => {
    defaultSpawnResizeEventProperties = properties
}

const toValue = (x: number) => {
    const a = clamp(align(laneToSpawnResizeEventValue(xToLane(x)), 20), 0, 999999999999)
    // //console.log(a)
    return a
}

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'spawnResizeEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.spawnResizeEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [spawnResizeEvent, editSpawnResizeEventJoint, editSelectedSpawnResizeEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.spawnResizeEvent,
    SpawnResizeEventSidebar,
    () => showModal(SpawnResizeEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultSpawnResizeEventProperties.ease,

    'spawnResizeEventJoint',
    toSpawnResizeEventJointEntity,
    addSpawnResizeEventJoint,
    removeSpawnResizeEventJoint,
)
