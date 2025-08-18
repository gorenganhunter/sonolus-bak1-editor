import { createEventTool } from '..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import {
    laneToTransparentEventValue,
    toTransparentEventJointEntity,
} from '../../../../state/entities/events/joints/transparent'
import { addTransparentEventJoint, removeTransparentEventJoint } from '../../../../state/mutations/events/transparent'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import TransparentEventPropertiesModal from './TransparentEventPropertiesModal.vue'

const toValue = (x: number) => clamp(align(laneToTransparentEventValue(xToLane(x)), 20))

export const transparentEvent = createEventTool(
    () => i18n.value.tools.events.types.transparentEvent,
    (object) => showModal(TransparentEventPropertiesModal, { object }),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),

    'transparentEventJoint',
    toTransparentEventJointEntity,
    addTransparentEventJoint,
    removeTransparentEventJoint,
)
