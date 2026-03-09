import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToSpawnMoveXEventValue, toSpawnMoveXEventJointEntity } from '../../../../state/entities/events/joints/spawnMoveX'
import {
    addSpawnMoveXEventJoint,
    removeSpawnMoveXEventJoint,
} from '../../../../state/mutations/events/spawnMoveX'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import SpawnMoveXEventPropertiesModal from './SpawnMoveXEventPropertiesModal.vue'
import SpawnMoveXEventSidebar from './SpawnMoveXEventSidebar.vue'

export type DefaultSpawnMoveXEventProperties = {
    ease?: EaseType
}

export let defaultSpawnMoveXEventProperties: DefaultSpawnMoveXEventProperties = {}

export const setDefaultSpawnMoveXEventProperties = (properties: DefaultSpawnMoveXEventProperties) => {
    defaultSpawnMoveXEventProperties = properties
}

const toValue = (x: number) => align(laneToSpawnMoveXEventValue(xToLane(x)), 20)

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'spawnMoveXEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.spawnMoveXEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [spawnMoveXEvent, editSpawnMoveXEventJoint, editSelectedSpawnMoveXEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.spawnMoveXEvent,
    SpawnMoveXEventSidebar,
    () => showModal(SpawnMoveXEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultSpawnMoveXEventProperties.ease,

    'spawnMoveXEventJoint',
    toSpawnMoveXEventJointEntity,
    addSpawnMoveXEventJoint,
    removeSpawnMoveXEventJoint,
)
