import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToJudgeMoveYEventValue, toJudgeMoveYEventJointEntity } from '../../../../state/entities/events/joints/judgeMoveY'
import {
    addJudgeMoveYEventJoint,
    removeJudgeMoveYEventJoint,
} from '../../../../state/mutations/events/judgeMoveY'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import JudgeMoveYEventPropertiesModal from './JudgeMoveYEventPropertiesModal.vue'
import JudgeMoveYEventSidebar from './JudgeMoveYEventSidebar.vue'

export type DefaultJudgeMoveYEventProperties = {
    ease?: EaseType
}

export let defaultJudgeMoveYEventProperties: DefaultJudgeMoveYEventProperties = {}

export const setDefaultJudgeMoveYEventProperties = (properties: DefaultJudgeMoveYEventProperties) => {
    defaultJudgeMoveYEventProperties = properties
}

const toValue = (x: number) => align(laneToJudgeMoveYEventValue(xToLane(x)), 20)

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'judgeMoveYEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.judgeMoveYEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [judgeMoveYEvent, editJudgeMoveYEventJoint, editSelectedJudgeMoveYEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.judgeMoveYEvent,
    JudgeMoveYEventSidebar,
    () => showModal(JudgeMoveYEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultJudgeMoveYEventProperties.ease,

    'judgeMoveYEventJoint',
    toJudgeMoveYEventJointEntity,
    addJudgeMoveYEventJoint,
    removeJudgeMoveYEventJoint,
)
