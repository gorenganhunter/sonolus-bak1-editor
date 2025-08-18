import { createEventTool } from '..'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { toRotateEventJointEntity } from '../../../../state/entities/events/joints/rotate'
import {
    addRotateEventJoint,
    removeRotateEventJoint,
} from '../../../../state/mutations/events/rotate'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { xToLane } from '../../../view'
import RotateEventPropertiesModal from './RotateEventPropertiesModal.vue'

const toValue = (x: number) => {
    let a = align(xToLane(x) * 360)
    // console.log(x, a)
    return a
}

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'rotateEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.rotateEventJoint
    return range && beat >= range.max.beat ? range.max : undefined
}

export const rotateEvent = createEventTool(
    () => i18n.value.tools.events.types.rotateEvent,
    (object) => showModal(RotateEventPropertiesModal, { object }),

    (value, x) => (value - toValue(x)) % 360 === 0,
    (beat, x) => {
        const value = toValue(x)

        const prev = getPrev(beat)
        if (!prev) return value
        // console.log(prev.value, value)
        return value + Math.floor(prev.value / 360) * 360
    },
    (value, sx, x) => value + align(xToLane(x) * 360) - align(xToLane(sx) * 360),

    'rotateEventJoint',
    toRotateEventJointEntity,
    addRotateEventJoint,
    removeRotateEventJoint,
)
