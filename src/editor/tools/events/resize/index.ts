import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToResizeEventValue, toResizeEventJointEntity } from '../../../../state/entities/events/joints/resize'
import {
    addResizeEventJoint,
    removeResizeEventJoint,
} from '../../../../state/mutations/events/resize'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import ResizeEventPropertiesModal from './ResizeEventPropertiesModal.vue'
import ResizeEventSidebar from './ResizeEventSidebar.vue'

export type DefaultResizeEventProperties = {
    ease?: EaseType
}

export let defaultResizeEventProperties: DefaultResizeEventProperties = {}

export const setDefaultResizeEventProperties = (properties: DefaultResizeEventProperties) => {
    defaultResizeEventProperties = properties
}

const toValue = (x: number) => {
    const a = clamp(align(laneToResizeEventValue(xToLane(x)), 20), 0, 999999999999)
    // console.log(a)
    return a
}

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'resizeEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.resizeEventJoint
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [resizeEvent, editResizeEventJoint, editSelectedResizeEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.resizeEvent,
    ResizeEventSidebar,
    () => showModal(ResizeEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultResizeEventProperties.ease,

    'resizeEventJoint',
    toResizeEventJointEntity,
    addResizeEventJoint,
    removeResizeEventJoint,
)
