import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToJudgeResizeEventValue, toJudgeResizeEventJointEntity } from '../../../../state/entities/events/joints/judgeResize'
import {
    addJudgeResizeEventJoint,
    removeJudgeResizeEventJoint,
} from '../../../../state/mutations/events/judgeResize'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import JudgeResizeEventPropertiesModal from './JudgeResizeEventPropertiesModal.vue'
import JudgeResizeEventSidebar from './JudgeResizeEventSidebar.vue'

export type DefaultJudgeResizeEventProperties = {
    ease?: EaseType
}

export let defaultJudgeResizeEventProperties: DefaultJudgeResizeEventProperties = {}

export const setDefaultJudgeResizeEventProperties = (properties: DefaultJudgeResizeEventProperties) => {
    defaultJudgeResizeEventProperties = properties
}

const toValue = (x: number) => {
    const a = clamp(align(laneToJudgeResizeEventValue(xToLane(x)), 20), 0, 999999999999)
    // //console.log(a)
    return a
}

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'judgeResizeEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.judgeResizeEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [judgeResizeEvent, editJudgeResizeEventJoint, editSelectedJudgeResizeEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.judgeResizeEvent,
    JudgeResizeEventSidebar,
    () => showModal(JudgeResizeEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultJudgeResizeEventProperties.ease,

    'judgeResizeEventJoint',
    toJudgeResizeEventJointEntity,
    addJudgeResizeEventJoint,
    removeJudgeResizeEventJoint,
)
