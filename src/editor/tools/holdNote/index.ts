import type { Tool } from 'vue-tsc'
import type { HoldNoteObject } from '../../../chart'
import { pushState, replaceState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { store } from '../../../history/store'
import { i18n } from '../../../i18n'
import { showModal } from '../../../modals'
import type { Entity } from '../../../state/entities'
import { toHoldNoteEntity, type HoldNoteEntity } from '../../../state/entities/notes/holdNote'
import { addHoldNote, removeHoldNote } from '../../../state/mutations/notes/holdNote'
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
import HoldNotePropertiesModal from './HoldNotePropertiesModal.vue'
import HoldNoteSidebar from './HoldNoteSidebar.vue'

export type DefaultHoldNoteProperties = {
    color?: number
}

export let defaultHoldNoteProperties: DefaultHoldNoteProperties = {}

export const setDefaultHoldNoteProperties = (properties: DefaultHoldNoteProperties) => {
    defaultHoldNoteProperties = properties
}

let active:
    | {
        type: 'add'
    }
    | {
        type: 'move'
        entity: HoldNoteEntity
        lane: number
    }
    | undefined

export const holdNote: Tool = {
    sidebar: HoldNoteSidebar,

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
                    toHoldNoteEntity({
                        beat,
                        lane,
                        size: 1 / view.lane,
                        duration: view.lastHoldDuration,
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
                const selectedHoldNoteEntities: Entity[] = selectedEntities.value.filter(
                    (entity) => entity.type === 'holdNote',
                )

                const targets = selectedHoldNoteEntities.includes(entity)
                    ? selectedHoldNoteEntities.filter((e) => e !== entity)
                    : [...selectedHoldNoteEntities, entity]

                replaceState({
                    ...state.value,
                    selectedEntities: targets,
                })
                view.entities = {
                    hovered: [],
                    creating: [],
                }
                focusViewAtBeat(entity.beat)

                notify(interpolate(() => i18n.value.tools.holdNote.selected, `${targets.length}`))
            } else {
                if (selectedEntities.value.includes(entity)) {
                    focusViewAtBeat(entity.beat)

                    if (isSidebarVisible.value) {
                        editSelectedEditableEntities({
                            // color:
                            //     ((aggregateProperty(
                            //         selectedEntities.value.filter(
                            //             (entity) => entity.type === 'holdNote',
                            //         ),
                            //         'color',
                            //     ) ?? -1) +
                            //         1) %
                            //     7,
                        })
                    } else {
                        void showModal(HoldNotePropertiesModal, {})
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

                    notify(interpolate(() => i18n.value.tools.holdNote.selected, '1'))
                }
            }
        } else {
            add({
                beat,
                lane,
                size: 1 / view.lane,
                stage: view.stage,
                duration: view.lastHoldDuration,
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

            notify(interpolate(() => i18n.value.tools.holdNote.moving, '1'))

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

            notify(interpolate(() => i18n.value.tools.holdNote.adding, '1'))

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
        //             notify(interpolate(() => i18n.value.tools.holdNote.moving, '1'))
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
        //                 toHoldNoteEntity({
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
                            toHoldNoteEntity({
                                beat,
                                lane,
                                size: 1 / view.lane,
                                stage: view.stage,
                                duration: view.lastHoldDuration,
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
                        toHoldNoteEntity({
                            beat: yToValidBeat(y),
                            lane: mod(active.entity.lane + xToValidLane(x) - active.lane, 4),
                            size: active.entity.size,
                            duration: active.entity.duration,
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

                    void showModal(HoldNotePropertiesModal, {})
                } else {
                    add({
                        beat,
                        lane,
                        size: 1 / view.lane,
                        stage: view.stage,
                        duration: view.lastHoldDuration,
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
                    duration: active.entity.duration,
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

const getHoldNoteFromSelection = () => {
    if (selectedEntities.value.length !== 1) return

    const [entity] = selectedEntities.value
    if (entity?.type !== 'holdNote') return

    return entity
}

const getPropertiesFromSelection = () => {
    const holdNote = getHoldNoteFromSelection()

    return {
        // <<<<<<< HEAD
        //         // color: entity.color,
        // =======
        //         color: defaultHoldNoteProperties.color ?? holdNote?.color ?? 0,
        // >>>>>>> upstream/main
    }
}

const find = (stage: number, beat: number, lane: number) =>
    getInStoreGrid(store.value.grid, 'holdNote', beat)?.find(
        (entity) => entity.stage === stage && entity.beat === beat && entity.lane === lane,
    )

const tryFind = (stage: number, x: number, y: number): [HoldNoteEntity] | [undefined, number, number] => {
    const [hit] = hitEntitiesAtPoint("holdNote", x, y)
        .sort((a, b) => +selectedEntities.value.includes(b) - +selectedEntities.value.includes(a))
    if (hit && Math.floor(hit.lane) === view.side && hit.stage === view.stage) return [hit]

    const lane = xToValidLane(x)
    const beat = yToValidBeat(y)
    const nearest = find(stage, beat, lane)
    if (nearest && Math.floor(nearest.lane) === view.side && nearest.stage === view.stage) return [nearest]

    return [undefined, beat, lane]
}

export const editHoldNote = (entity: HoldNoteEntity, object: Partial<HoldNoteObject>) => {
    editMoveOrReplace(entity, {
        beat: object.beat ?? entity.beat,
        // color: object.color ?? entity.color,
        lane: object.lane ?? entity.lane,
        size: object.size ?? entity.size,
        duration: object.duration ?? entity.duration,
        stage: object.stage ?? entity.stage,
    })
}

export const editSelectedHoldNote = (
    transaction: Transaction,
    entity: HoldNoteEntity,
    object: Partial<HoldNoteObject>,
) => {
    removeHoldNote(transaction, entity)
    return addHoldNote(transaction, {
        beat: object.beat ?? entity.beat,
        size: object.size ?? entity.size,
        duration: object.duration ?? entity.duration,
        stage: object.stage ?? entity.stage,
        lane: object.lane ?? entity.lane,
    })
}

const editMoveOrReplace = (entity: HoldNoteEntity, object: HoldNoteObject) => {
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

const add = (object: HoldNoteObject) => {
    update(
        () => i18n.value.tools.holdNote.added,
        (transaction) => {
            return addHoldNote(transaction, object)
        },
    )
}

const edit = (entity: HoldNoteEntity, object: HoldNoteObject) => {
    update(
        () => i18n.value.tools.holdNote.edited,
        (transaction) => {
            removeHoldNote(transaction, entity)
            return addHoldNote(transaction, object)
        },
    )
}

const move = (object: HoldNoteObject, old: HoldNoteEntity) => {
    update(
        () => i18n.value.tools.holdNote.moved,
        (transaction) => {
            removeHoldNote(transaction, old)
            return addHoldNote(transaction, object)
        },
    )
}

const replace = (entity: HoldNoteEntity, object: HoldNoteObject, old: HoldNoteEntity) => {
    update(
        () => i18n.value.tools.holdNote.replaced,
        (transaction) => {
            removeHoldNote(transaction, old)
            removeHoldNote(transaction, entity)
            return addHoldNote(transaction, object)
        },
    )
}
