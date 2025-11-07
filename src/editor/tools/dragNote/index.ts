import type { Tool } from 'vue-tsc'
import type { BaseNoteObject } from '../../../chart'
import { pushState, replaceState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { store } from '../../../history/store'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import type { Entity } from '../../../state/entities'
import { toDragNoteEntity, type DragNoteEntity } from '../../../state/entities/notes/dragNote'
import { addDragNote, removeDragNote } from '../../../state/mutations/notes/dragNote'
import { getInStoreGrid } from '../../../state/store/grid'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { align, mod } from '../../../utils/math'
import { notify } from '../../notification'
import { isSidebarVisible } from '../../sidebars'
import { editSelectedEditableEntities } from '../../sidebars/default'
import { aggregateProperty } from '../../utils/properties'
import {
    focusViewAtBeat,
    setViewHover,
    snapYToBeat,
    view,
    xToLane,
    xToValidLane,
    yToValidBeat,
} from '../../view'
import { hitEntitiesAtPoint } from '../utils'
import DragNotePropertiesModal from './DragNotePropertiesModal.vue'
import DragNoteSidebar from './DragNoteSidebar.vue'

export type DefaultDragNoteProperties = {
    color?: number
}

export let defaultDragNoteProperties: DefaultDragNoteProperties = {}

export const setDefaultDragNoteProperties = (properties: DefaultDragNoteProperties) => {
    defaultDragNoteProperties = properties
}

let active:
    | {
        type: 'add'
    }
    | {
        type: 'move'
        entity: DragNoteEntity
        lane: number
    }
    | undefined

export const dragNote: Tool = {
    sidebar: DragNoteSidebar,

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
                    toDragNoteEntity({
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

    tap(x, y, modifiers) {
        const [entity, beat, lane] = tryFind(view.stage, x, y)
        if (entity) {
            if (modifiers.ctrl) {
                const selectedDragNoteEntities: Entity[] = selectedEntities.value.filter(
                    (entity) => entity.type === 'dragNote',
                )

                const targets = selectedDragNoteEntities.includes(entity)
                    ? selectedDragNoteEntities.filter((e) => e !== entity)
                    : [...selectedDragNoteEntities, entity]

                replaceState({
                    ...state.value,
                    selectedEntities: targets,
                })
                view.entities = {
                    hovered: [],
                    creating: [],
                }
                focusViewAtBeat(entity.beat)

                notify(interpolate(() => i18n.value.tools.dragNote.selected, `${targets.length}`))
            } else {
                if (selectedEntities.value.includes(entity)) {
                    focusViewAtBeat(entity.beat)

                    if (isSidebarVisible.value) {
                        editSelectedEditableEntities({
                            // color:
                            //     ((aggregateProperty(
                            //         selectedEntities.value.filter(
                            //             (entity) => entity.type === 'dragNote',
                            //         ),
                            //         'color',
                            //     ) ?? -1) +
                            //         1) %
                            //     7,
                        })
                    } else {
                        void showModal(DragNotePropertiesModal, {})
                    }
                } else {
                    replaceState({
                        ...state.value,
                        selectedEntities: [entity],
                    })
                    view.entities = {
                        hovered: [],
                        creating: [],
                    }
                    focusViewAtBeat(entity.beat)

                    notify(interpolate(() => i18n.value.tools.dragNote.selected, '1'))
                }
            }
        } else {
            add({
                beat,
                lane,
                size: 1 / view.lane,
                stage: view.stage,
                ...getPropertiesFromSelection(),
            })
            focusViewAtBeat(beat)
        }
    },

    dragStart(x, y) {
        const [entity, beat] = tryFind(view.stage, x, y)
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

            notify(interpolate(() => i18n.value.tools.dragNote.moving, '1'))

            active = {
                type: 'move',
                entity,
                lane: xToValidLane(x),
            }
        } else {
            // <<<<<<< HEAD
            //             add({
            //                 beat,
            //                 lane, size: 1 / view.lane, stage: view.stage,
            //                 ...getPropertiesFromSelection(),
            //             })
            // =======
            // >>>>>>> upstream/main
            focusViewAtBeat(beat)

            notify(interpolate(() => i18n.value.tools.dragNote.adding, '1'))

            active = {
                type: 'add',
            }
        }

        // <<<<<<< HEAD
        //         dragStart(x, y) {
        //             const [entity] = tryFind(view.stage, x, y)
        //             if (!entity) return false
        //
        //             replaceState({
        //                 ...state.value,
        //                 selectedEntities: [entity],
        //             })
        //             view.entities = {
        //                 hovered: [],
        //                 creating: [],
        //             }
        //             focusViewAtBeat(entity.beat)
        //
        //             notify(interpolate(() => i18n.value.tools.dragNote.moving, '1'))
        //
        //             active = {
        //                 entity,
        //                 lane: xToValidLane(x),
        //             }
        // =======
        // >>>>>>> upstream/main
        return true
    },

    dragUpdate(x, y) {
        if (!active) return

        setViewHover(x, y)

        // <<<<<<< HEAD
        //         view.entities = {
        //             hovered: [],
        //             creating: [
        //                 toDragNoteEntity({
        //                     beat: yToValidBeat(y),
        //                     lane: mod(active.entity.lane + xToValidLane(x) - active.lane, 4),
        //                     size: active.entity.size,
        //                     stage: active.entity.stage
        //                 }),
        //             ],
        // =======
        switch (active.type) {
            case 'add': {
                const [entity, beat, lane] = tryFind(view.stage, x, y)
                if (entity) {
                    view.entities = {
                        hovered: [entity],
                        creating: [],
                    }
                    focusViewAtBeat(entity.beat)
                } else {
                    view.entities = {
                        hovered: [],
                        creating: [
                            toDragNoteEntity({
                                beat,
                                lane,
                                size: 1 / view.lane,
                                stage: view.stage,
                                ...getPropertiesFromSelection(),
                            }),
                        ],
                    }
                    focusViewAtBeat(beat)
                }
                break
            }
            case 'move': {
                const beat = snapYToBeat(y, active.entity.beat)

                view.entities = {
                    hovered: [],
                    creating: [
                        toDragNoteEntity({
                            beat: yToValidBeat(y),
                            lane: mod(active.entity.lane + xToValidLane(x) - active.lane, 4),
                            size: active.entity.size,
                            stage: active.entity.stage
                        }),
                    ],
                }
                focusViewAtBeat(beat)
                break
            }
        }
    },

    dragEnd(x, y) {
        if (!active) return

        // <<<<<<< HEAD
        //         editMoveOrReplace(active.entity, {
        //             beat: yToValidBeat(y),
        //             lane: mod(active.entity.lane + xToValidLane(x) - active.lane, 4),
        //             size: active.entity.size,
        //             stage: active.entity.stage
        //         })
        // =======
        switch (active.type) {
            case 'add': {
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

                    void showModal(DragNotePropertiesModal, {})
                } else {
                    add({
                        beat,
                        lane,
                        size: 1 / view.lane,
                        stage: view.stage,
                        ...getPropertiesFromSelection(),
                    })
                    focusViewAtBeat(beat)
                }
                break
            }
            case 'move': {
                const beat = snapYToBeat(y, active.entity.beat)

                editMoveOrReplace(active.entity, {
                    beat,
                    size: active.entity.size,
                    stage: active.entity.stage,
                    lane: mod(active.entity.lane + xToValidLane(x) - active.lane, 4),
                })
                focusViewAtBeat(beat)
                break
            }
        }
        // >>>>>>> upstream/main

        active = undefined
    },
}

const getDragNoteFromSelection = () => {
    if (selectedEntities.value.length !== 1) return

    const [entity] = selectedEntities.value
    if (entity?.type !== 'dragNote') return

    return entity
}

const getPropertiesFromSelection = () => {
    const dragNote = getDragNoteFromSelection()

    return {
        // <<<<<<< HEAD
        //         // color: entity.color,
        // =======
        //         color: defaultDragNoteProperties.color ?? dragNote?.color ?? 0,
        // >>>>>>> upstream/main
    }
}

const find = (stage: number, beat: number, lane: number) =>
    getInStoreGrid(store.value.grid, 'dragNote', beat)?.find(
        (entity) => entity.stage === stage && entity.beat === beat && entity.lane === lane,
    )

const tryFind = (stage: number, x: number, y: number): [DragNoteEntity] | [undefined, number, number] => {
    const [hit] = hitEntitiesAtPoint("dragNote", x, y)
        .sort((a, b) => +selectedEntities.value.includes(b) - +selectedEntities.value.includes(a))
    if (hit && Math.floor(hit.lane) === view.side && hit.stage === view.stage) return [hit]

    const lane = xToValidLane(x)
    const beat = yToValidBeat(y)
    const nearest = find(stage, beat, lane)
    if (nearest && Math.floor(nearest.lane) === view.side && nearest.stage === view.stage) return [nearest]

    return [undefined, beat, lane]
}

export const editDragNote = (entity: DragNoteEntity, object: Partial<BaseNoteObject>) => {
    editMoveOrReplace(entity, {
        beat: object.beat ?? entity.beat,
        // color: object.color ?? entity.color,
        lane: object.lane ?? entity.lane,
        size: object.size ?? entity.size,
        stage: object.stage ?? entity.stage,
    })
}

export const editSelectedDragNote = (
    transaction: Transaction,
    entity: DragNoteEntity,
    object: Partial<BaseNoteObject>,
) => {
    removeDragNote(transaction, entity)
    return addDragNote(transaction, {
        beat: object.beat ?? entity.beat,
        size: object.size ?? entity.size,
        stage: object.stage ?? entity.stage,
        lane: object.lane ?? entity.lane,
    })
}

const editMoveOrReplace = (entity: DragNoteEntity, object: BaseNoteObject) => {
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
        () => i18n.value.tools.dragNote.added,
        (transaction) => {
            return addDragNote(transaction, object)
        },
    )
}

const edit = (entity: DragNoteEntity, object: BaseNoteObject) => {
    update(
        () => i18n.value.tools.dragNote.edited,
        (transaction) => {
            removeDragNote(transaction, entity)
            return addDragNote(transaction, object)
        },
    )
}

const move = (object: BaseNoteObject, old: DragNoteEntity) => {
    update(
        () => i18n.value.tools.dragNote.moved,
        (transaction) => {
            removeDragNote(transaction, old)
            return addDragNote(transaction, object)
        },
    )
}

const replace = (entity: DragNoteEntity, object: BaseNoteObject, old: DragNoteEntity) => {
    update(
        () => i18n.value.tools.dragNote.replaced,
        (transaction) => {
            removeDragNote(transaction, old)
            removeDragNote(transaction, entity)
            return addDragNote(transaction, object)
        },
    )
}
