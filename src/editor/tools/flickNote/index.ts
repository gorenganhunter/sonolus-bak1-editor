import type { Tool } from 'vue-tsc'
import type { BaseNoteObject } from '../../../chart'
import { pushState, replaceState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { store } from '../../../history/store'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import type { Entity } from '../../../state/entities'
import { toFlickNoteEntity, type FlickNoteEntity } from '../../../state/entities/notes/flickNote'
import { addFlickNote, removeFlickNote } from '../../../state/mutations/notes/flickNote'
import { getInStoreGrid } from '../../../state/store/grid'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { align, mod } from '../../../utils/math'
import { notify } from '../../notification'
import {
    focusViewAtBeat,
    setViewHover,
    view,
    xToLane,
    xToValidLane,
    yToValidBeat,
} from '../../view'
import { hitEntitiesAtPoint } from '../utils'
import FlickNotePropertiesModal from './FlickNotePropertiesModal.vue'

let active:
    | {
        entity: FlickNoteEntity
        lane: number
    }
    | undefined

export const flickNote: Tool = {
    hover(x, y) {
        const stage = view.stage
        const [entity, beat, lane] = tryFind(stage, x, y)
        if (entity) {
            view.entities = {
                hovered: [entity],
                creating: [],
            }
        } else {
            view.entities = {
                hovered: [],
                creating: [
                    toFlickNoteEntity({
                        beat,
                        lane,
                        size: 1 / view.lane,
                        stage,
                        ...getPropertiesFromSelection(),
                    }),
                ],
            }
        }
    },

    async tap(x, y) {
        const [entity, beat, lane] = tryFind(view.stage, x, y)
        if (entity) {
            replaceState({
                ...state.value,
                selectedEntities: [entity],
            })
            view.entities = {
                hovered: [],
                creating: [],
            }
            focusViewAtBeat(entity.beat)

            const object = await showModal(FlickNotePropertiesModal, {
                object: entity,
            })
            if (!object) return

            editMoveOrReplace(entity, object)
        } else {
            add({
                beat,
                lane, size: 1 / view.lane, stage: view.stage,
                ...getPropertiesFromSelection(),
            })
            focusViewAtBeat(beat)
        }
    },

    dragStart(x, y) {
        const [entity] = tryFind(view.stage, x, y)
        if (!entity) return false

        replaceState({
            ...state.value,
            selectedEntities: [entity],
        })
        view.entities = {
            hovered: [],
            creating: [],
        }
        focusViewAtBeat(entity.beat)

        notify(interpolate(() => i18n.value.tools.flickNote.moving, '1'))

        active = {
            entity,
            lane: xToValidLane(x),
        }
        return true
    },

    dragUpdate(x, y) {
        if (!active) return

        setViewHover(x, y)

        view.entities = {
            hovered: [],
            creating: [
                toFlickNoteEntity({
                    beat: yToValidBeat(y),
                    lane: mod(active.entity.lane + xToValidLane(x) - active.lane, 4),
                    size: active.entity.size,
                    stage: active.entity.stage
                }),
            ],
        }
    },

    dragEnd(x, y) {
        if (!active) return

        editMoveOrReplace(active.entity, {
            beat: yToValidBeat(y),
            lane: mod(active.entity.lane + xToValidLane(x) - active.lane, 4),
            size: active.entity.size,
            stage: active.entity.stage
        })

        active = undefined
    },
}

const getPropertiesFromSelection = () => {
    if (selectedEntities.value.length !== 1) return

    const [entity] = selectedEntities.value
    if (entity?.type !== 'flickNote') return

    return {
        // color: entity.color,
    }
}

const find = (stage: number, beat: number, lane: number) =>
    getInStoreGrid(store.value.grid, 'flickNote', beat)?.find(
        (entity) => entity.stage === stage && entity.beat === beat && entity.lane === lane,
    )

const tryFind = (stage: number, x: number, y: number): [FlickNoteEntity] | [undefined, number, number] => {
    const [hit] = hitEntitiesAtPoint(x, y)
        .filter((entity) => entity.type === 'flickNote')
        .sort((a, b) => +selectedEntities.value.includes(b) - +selectedEntities.value.includes(a))
    if (hit && Math.floor(hit.lane) === view.side && hit.stage === view.stage) return [hit]

    const lane = xToValidLane(x)
    const beat = yToValidBeat(y)
    const nearest = find(stage, beat, lane)
    if (nearest && Math.floor(nearest.lane) === view.side && nearest.stage === view.stage) return [nearest]

    return [undefined, beat, lane]
}

const editMoveOrReplace = (entity: FlickNoteEntity, object: BaseNoteObject) => {
    if (entity.stage === object.stage && entity.beat === object.beat && entity.lane === object.lane) {
        edit(entity, object)
        return
    }

    const overlap = find(object.stage, object.beat, object.lane)
    if (overlap) {
        replace(overlap, object, entity)
    } else {
        move(object, entity)
    }
    focusViewAtBeat(object.beat)
}

const update = (message: () => string, action: (transaction: Transaction) => Entity[]) => {
    const transaction = createTransaction(state.value)

    const selectedEntities = action(transaction)

    pushState(interpolate(message, `${selectedEntities.length}`), {
        ...transaction.commit(),
        selectedEntities,
    })
    view.entities = {
        hovered: [],
        creating: [],
    }

    notify(interpolate(message, `${selectedEntities.length}`))
}

const add = (object: BaseNoteObject) => {
    update(
        () => i18n.value.tools.flickNote.added,
        (transaction) => {
            return addFlickNote(transaction, object)
        },
    )
}

const edit = (entity: FlickNoteEntity, object: BaseNoteObject) => {
    update(
        () => i18n.value.tools.flickNote.edited,
        (transaction) => {
            removeFlickNote(transaction, entity)
            return addFlickNote(transaction, object)
        },
    )
}

const move = (object: BaseNoteObject, old: FlickNoteEntity) => {
    update(
        () => i18n.value.tools.flickNote.moved,
        (transaction) => {
            removeFlickNote(transaction, old)
            return addFlickNote(transaction, object)
        },
    )
}

const replace = (entity: FlickNoteEntity, object: BaseNoteObject, old: FlickNoteEntity) => {
    update(
        () => i18n.value.tools.flickNote.replaced,
        (transaction) => {
            removeFlickNote(transaction, old)
            removeFlickNote(transaction, entity)
            return addFlickNote(transaction, object)
        },
    )
}
