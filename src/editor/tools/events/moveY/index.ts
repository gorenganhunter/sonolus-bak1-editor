import { createEventTool } from '..'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import {
    laneToMoveYEventValue,
    toMoveYEventJointEntity,
} from '../../../../state/entities/events/joints/moveY'
import { addMoveYEventJoint, removeMoveYEventJoint } from '../../../../state/mutations/events/moveY'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import MoveYEventPropertiesModal from './MoveYEventPropertiesModal.vue'

const toValue = (x: number) => align(laneToMoveYEventValue(xToLane(x)), 10)

export const moveYEvent = createEventTool(
    () => i18n.value.tools.events.types.moveYEvent,
    (object) => showModal(MoveYEventPropertiesModal, { object }),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),

    'moveYEventJoint',
    toMoveYEventJointEntity,
    addMoveYEventJoint,
    removeMoveYEventJoint,
)
