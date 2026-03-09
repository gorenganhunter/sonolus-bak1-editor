import { createEventTool } from '..'
import type { EaseType } from '../../../../chart'
import { store } from '../../../../history/store'
import { i18n } from '../../../../i18n'
import { showModal } from '../../../../modals'
import { laneToNoteHEventValue, toNoteHEventJointEntity } from '../../../../state/entities/events/joints/noteH'
import {
    addNoteHEventJoint,
    removeNoteHEventJoint,
} from '../../../../state/mutations/events/noteH'
import { getInStoreGrid } from '../../../../state/store/grid'
import { align, clamp } from '../../../../utils/math'
import { view, xToLane } from '../../../view'
import NoteHEventPropertiesModal from './NoteHEventPropertiesModal.vue'
import NoteHEventSidebar from './NoteHEventSidebar.vue'

export type DefaultNoteHEventProperties = {
    ease?: EaseType
}

export let defaultNoteHEventProperties: DefaultNoteHEventProperties = {}

export const setDefaultNoteHEventProperties = (properties: DefaultNoteHEventProperties) => {
    defaultNoteHEventProperties = properties
}

const toValue = (x: number) => clamp(align(laneToNoteHEventValue(xToLane(x)), 20))

const getPrev = (beat: number) => {
    const connection = getInStoreGrid(store.value.grid, 'noteHEventConnection', beat)?.find(
        (entity) => beat >= entity.min.beat && beat < entity.max.beat,
    )
    if (connection) return connection.min

    const range = store.value.eventRanges.noteHEventJoint?.get(view.stage)
    return range && beat >= range.max.beat ? range.max : undefined
}

export const [noteHEvent, editNoteHEventJoint, editSelectedNoteHEventJoint] = createEventTool(
    () => i18n.value.tools.events.types.noteHEvent,
    NoteHEventSidebar,
    () => showModal(NoteHEventPropertiesModal, {}),

    (value, x) => value === toValue(x),
    (beat, x) => toValue(x),
    (beat, sx, x) => toValue(x),
    () => defaultNoteHEventProperties.ease,

    'noteHEventJoint',
    toNoteHEventJointEntity,
    addNoteHEventJoint,
    removeNoteHEventJoint,
)
