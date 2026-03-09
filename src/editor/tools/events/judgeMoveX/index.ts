import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToJudgeMoveXEventValue, toJudgeMoveXEventJointEntity } from '../../../../state/entities/events/joints/judgeMoveX'
import {
    addJudgeMoveXEventJoint,
    removeJudgeMoveXEventJoint,
} from '../../../../state/mutations/events/judgeMoveX'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import JudgeMoveXEventPropertiesModal from './JudgeMoveXEventPropertiesModal.vue'
import JudgeMoveXEventSidebar from './JudgeMoveXEventSidebar.vue'

export type DefaultJudgeMoveXEventProperties = {
    ease?: EaseType
}

export let defaultJudgeMoveXEventProperties: DefaultJudgeMoveXEventProperties = {}

export const setDefaultJudgeMoveXEventProperties = (properties: DefaultJudgeMoveXEventProperties) => {
    defaultJudgeMoveXEventProperties = properties
}

const toValue = (x: number) => align(laneToJudgeMoveXEventValue(xToLane(x)), 20)

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'judgeMoveXEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.judgeMoveXEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [judgeMoveXEvent, editJudgeMoveXEventJoint, editSelectedJudgeMoveXEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.judgeMoveXEvent,
    JudgeMoveXEventSidebar,
    () => showModal(JudgeMoveXEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultJudgeMoveXEventProperties.ease,

    'judgeMoveXEventJoint',
    toJudgeMoveXEventJointEntity,
    addJudgeMoveXEventJoint,
    removeJudgeMoveXEventJoint,
)
