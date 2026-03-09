import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { toJudgeRotateEventJointEntity } from '../../../../state/entities/events/joints/judgeRotate'
import {
    addJudgeRotateEventJoint,
    removeJudgeRotateEventJoint,
} from '../../../../state/mutations/events/judgeRotate'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import JudgeRotateEventPropertiesModal from './JudgeRotateEventPropertiesModal.vue'
import JudgeRotateEventSidebar from './JudgeRotateEventSidebar.vue'

export type DefaultJudgeRotateEventProperties = {
    ease?: EaseType
}

export let defaultJudgeRotateEventProperties: DefaultJudgeRotateEventProperties = {}

export const setDefaultJudgeRotateEventProperties = (properties: DefaultJudgeRotateEventProperties) => {
    defaultJudgeRotateEventProperties = properties
}

const toValue = (x: number) => {
    let a = align(xToLane(x) * 360 - 180)
    // //console.log(x, a)
    return a
}

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'judgeRotateEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.judgeRotateEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [judgeRotateEvent, editJudgeRotateEventJoint, editSelectedJudgeRotateEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.judgeRotateEvent,
    JudgeRotateEventSidebar,
    () => showModal(JudgeRotateEventPropertiesModal, {}),

    (value, x) => (value - toValue(x)) % 360 === 0,
    (beat, x) => {
        const value = toValue(x)

        const prev = getPrev(beat)
        if (!prev) return value
        // //console.log(prev.value, value)
        return value + Math.floor(prev.value / 360) * 360
    },
    (value, sx, x) => value + align(xToLane(x) * 360) - align(xToLane(sx) * 360),
    () => defaultJudgeRotateEventProperties.ease,

    'judgeRotateEventJoint',
    toJudgeRotateEventJointEntity,
    addJudgeRotateEventJoint,
    removeJudgeRotateEventJoint,
)
