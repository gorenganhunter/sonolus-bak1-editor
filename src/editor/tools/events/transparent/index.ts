import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToTransparentEventValue, toTransparentEventJointEntity } from '../../../../state/entities/events/joints/transparent'
import {
    addTransparentEventJoint,
    removeTransparentEventJoint,
} from '../../../../state/mutations/events/transparent'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import TransparentEventPropertiesModal from './TransparentEventPropertiesModal.vue'
import TransparentEventSidebar from './TransparentEventSidebar.vue'

export type DefaultTransparentEventProperties = {
    ease?: EaseType
}

export let defaultTransparentEventProperties: DefaultTransparentEventProperties = {}

export const setDefaultTransparentEventProperties = (properties: DefaultTransparentEventProperties) => {
    defaultTransparentEventProperties = properties
}

const toValue = (x: number) => clamp(align(laneToTransparentEventValue(xToLane(x)), 20))

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'transparentEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.transparentEventJoint
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [transparentEvent, editTransparentEventJoint, editSelectedTransparentEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.transparentEvent,
    TransparentEventSidebar,
    () => showModal(TransparentEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultTransparentEventProperties.ease,

    'transparentEventJoint',
    toTransparentEventJointEntity,
    addTransparentEventJoint,
    removeTransparentEventJoint,
)
