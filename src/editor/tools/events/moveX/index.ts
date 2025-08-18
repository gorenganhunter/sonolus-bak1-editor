import { createEventTool } from '..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import {
    laneToMoveXEventValue,
    toMoveXEventJointEntity,
} from '../../../../state/entities/events/joints/moveX'
import { addMoveXEventJoint, removeMoveXEventJoint } from '../../../../state/mutations/events/moveX'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import MoveXEventPropertiesModal from './MoveXEventPropertiesModal.vue'

const toValue = (x: number) => align(laneToMoveXEventValue(xToLane(x)), 10)

export const moveXEvent = createEventTool(
    () => i18n.value.tools.events.types.moveXEvent,
    (object) => showModal(MoveXEventPropertiesModal, { object }),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),

    'moveXEventJoint',
    toMoveXEventJointEntity,
    addMoveXEventJoint,
    removeMoveXEventJoint,
)
