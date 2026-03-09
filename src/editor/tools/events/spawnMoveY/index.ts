import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToSpawnMoveYEventValue, toSpawnMoveYEventJointEntity } from '../../../../state/entities/events/joints/spawnMoveY'
import {
    addSpawnMoveYEventJoint,
    removeSpawnMoveYEventJoint,
} from '../../../../state/mutations/events/spawnMoveY'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import SpawnMoveYEventPropertiesModal from './SpawnMoveYEventPropertiesModal.vue'
import SpawnMoveYEventSidebar from './SpawnMoveYEventSidebar.vue'

export type DefaultSpawnMoveYEventProperties = {
    ease?: EaseType
}

export let defaultSpawnMoveYEventProperties: DefaultSpawnMoveYEventProperties = {}

export const setDefaultSpawnMoveYEventProperties = (properties: DefaultSpawnMoveYEventProperties) => {
    defaultSpawnMoveYEventProperties = properties
}

const toValue = (x: number) => align(laneToSpawnMoveYEventValue(xToLane(x)), 20)

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'spawnMoveYEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.spawnMoveYEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [spawnMoveYEvent, editSpawnMoveYEventJoint, editSelectedSpawnMoveYEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.spawnMoveYEvent,
    SpawnMoveYEventSidebar,
    () => showModal(SpawnMoveYEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultSpawnMoveYEventProperties.ease,

    'spawnMoveYEventJoint',
    toSpawnMoveYEventJointEntity,
    addSpawnMoveYEventJoint,
    removeSpawnMoveYEventJoint,
)
