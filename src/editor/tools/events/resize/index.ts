import { createEventTool } from '..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import {
    laneToResizeEventValue,
    toResizeEventJointEntity,
} from '../../../../state/entities/events/joints/resize'
import { addResizeEventJoint, removeResizeEventJoint } from '../../../../state/mutations/events/resize'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import ResizeEventPropertiesModal from './ResizeEventPropertiesModal.vue'

const toValue = (x: number) => {
    const a = clamp(align(laneToResizeEventValue(xToLane(x)), 20), 0, 999999999999)
    // console.log(a)
    return a
}

export const resizeEvent = createEventTool(
    () => i18n.value.tools.events.types.resizeEvent,
    (object) => showModal(ResizeEventPropertiesModal, { object }),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),

    'resizeEventJoint',
    toResizeEventJointEntity,
    addResizeEventJoint,
    removeResizeEventJoint,
)
