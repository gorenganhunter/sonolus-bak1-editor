import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToMoveYEventValue, toMoveYEventJointEntity } from '../../../../state/entities/events/joints/moveY'
import {
    addMoveYEventJoint,
    removeMoveYEventJoint,
} from '../../../../state/mutations/events/moveY'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import MoveYEventPropertiesModal from './MoveYEventPropertiesModal.vue'
import MoveYEventSidebar from './MoveYEventSidebar.vue'

export type DefaultMoveYEventProperties = {
    ease?: EaseType
}

export let defaultMoveYEventProperties: DefaultMoveYEventProperties = {}

export const setDefaultMoveYEventProperties = (properties: DefaultMoveYEventProperties) => {
    defaultMoveYEventProperties = properties
}

const toValue = (x: number) => align(laneToMoveYEventValue(xToLane(x)), 10)

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'moveYEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.moveYEventJoint
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [moveYEvent, editMoveYEventJoint, editSelectedMoveYEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.moveYEvent,
    MoveYEventSidebar,
    () => showModal(MoveYEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultMoveYEventProperties.ease,

    'moveYEventJoint',
    toMoveYEventJointEntity,
    addMoveYEventJoint,
    removeMoveYEventJoint,
)
