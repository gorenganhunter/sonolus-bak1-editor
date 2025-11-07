import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToMoveXEventValue, toMoveXEventJointEntity } from '../../../../state/entities/events/joints/moveX'
import {
    addMoveXEventJoint,
    removeMoveXEventJoint,
} from '../../../../state/mutations/events/moveX'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import MoveXEventPropertiesModal from './MoveXEventPropertiesModal.vue'
import MoveXEventSidebar from './MoveXEventSidebar.vue'

export type DefaultMoveXEventProperties = {
    ease?: EaseType
}

export let defaultMoveXEventProperties: DefaultMoveXEventProperties = {}

export const setDefaultMoveXEventProperties = (properties: DefaultMoveXEventProperties) => {
    defaultMoveXEventProperties = properties
}

const toValue = (x: number) => align(laneToMoveXEventValue(xToLane(x)), 10)

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'moveXEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.moveXEventJoint
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [moveXEvent, editMoveXEventJoint, editSelectedMoveXEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.moveXEvent,
    MoveXEventSidebar,
    () => showModal(MoveXEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultMoveXEventProperties.ease,

    'moveXEventJoint',
    toMoveXEventJointEntity,
    addMoveXEventJoint,
    removeMoveXEventJoint,
)
