import type { Tool } from '..'
import type { StageValueObject, ValueObject } from '../../../chart'
import { pushState, replaceState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { store } from '../../../history/store'
import { i18n } from '../../../i18n'
import type { Entity, EntityOfType } from '../../../state/entities'
import type { ValueEntityType } from '../../../state/entities/values'
import type { TimeScaleEntity } from '../../../state/entities/values/timeScale'
import type { AddMutation, RemoveMutation } from '../../../state/mutations'
import { getInStoreGrid } from '../../../state/store/grid'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { focusViewAtBeat, setViewHover, view, yToValidBeat } from '../../view'
import { hitEntitiesAtPoint } from '../utils'

export const createValueTool = <T extends ValueEntityType>(
    objectName: () => string,
    showPropertiesModal: (
        object: ValueObject | EntityOfType<T>,
    ) => Promise<ValueObject | undefined>,

    defaultValue: number,

    type: T,
    toEntity: (object: ValueObject) => EntityOfType<T>,
    addEntity: AddMutation<ValueObject>,
    removeEntity: RemoveMutation<EntityOfType<T>>,
): Tool => {
    const find = (beat: number) =>
        getInStoreGrid(store.value.grid, type, beat)?.find((entity) => entity.beat === beat)

    const tryFind = (
        x: number,
        y: number,
    ): [true, EntityOfType<T>] | [false, undefined, number] => {
        const [hit] = hitEntitiesAtPoint(x, y)
            .filter((entity): entity is EntityOfType<T> => entity.type === type)
            .sort(
                (a, b) => +selectedEntities.value.includes(b) - +selectedEntities.value.includes(a),
            )
        if (hit) return [true, hit]

        const beat = yToValidBeat(y)
        const nearest = find(beat)
        if (nearest) return [true, nearest]

        return [false, undefined, beat]
    }

    const editMoveOrReplace = (entity: EntityOfType<T>, object: ValueObject) => {
        if (entity.beat === object.beat) {
            edit(entity, object)
            return
        }

        const overlap = find(object.beat)
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

        pushState(interpolate(message, `${selectedEntities.length}`, objectName), {
            ...transaction.commit(),
            selectedEntities,
        })
        view.entities = {
            hovered: [],
            creating: [],
        }

        notify(interpolate(message, `${selectedEntities.length}`, objectName))
    }

    const add = (object: ValueObject) => {
        update(
            () => i18n.value.tools.values.added,
            (transaction) => {
                return addEntity(transaction, object)
            },
        )
    }

    const edit = (entity: EntityOfType<T>, object: ValueObject) => {
        update(
            () => i18n.value.tools.values.edited,
            (transaction) => {
                removeEntity(transaction, entity)
                return addEntity(transaction, object)
            },
        )
    }

    const move = (object: ValueObject, old: EntityOfType<T>) => {
        update(
            () => i18n.value.tools.values.moved,
            (transaction) => {
                if (old.beat) removeEntity(transaction, old)
                return addEntity(transaction, object)
            },
        )
    }

    const replace = (entity: EntityOfType<T>, object: ValueObject, old: EntityOfType<T>) => {
        update(
            () => i18n.value.tools.values.replaced,
            (transaction) => {
                if (old.beat) removeEntity(transaction, old)
                removeEntity(transaction, entity)
                return addEntity(transaction, object)
            },
        )
    }

    let active: EntityOfType<T> | undefined

    return {
        hover(x, y) {
            const [result, entity, beat] = tryFind(x, y)
            if (result) {
                view.entities = {
                    hovered: [entity],
                    creating: [],
                }
            } else {
                view.entities = {
                    hovered: [],
                    creating: [
                        toEntity({
                            beat,
                            value: defaultValue,
                        }),
                    ],
                }
            }
        },

        async tap(x, y) {
            const [result, entity, beat] = tryFind(x, y)
            if (result) {
                replaceState({
                    ...state.value,
                    selectedEntities: [entity],
                })
                view.entities = {
                    hovered: [],
                    creating: [],
                }
                focusViewAtBeat(entity.beat)

                const object = await showPropertiesModal(entity)
                if (!object) return

                editMoveOrReplace(entity, object)
            } else {
                replaceState({
                    ...state.value,
                    selectedEntities: [],
                })
                view.entities = {
                    hovered: [],
                    creating: [
                        toEntity({
                            beat,
                            value: defaultValue,
                        }),
                    ],
                }
                focusViewAtBeat(beat)

                const object = await showPropertiesModal({
                    beat,
                    value: defaultValue,
                })
                if (!object) return

                const overlap = find(object.beat)
                if (overlap) {
                    edit(overlap, object)
                } else {
                    add(object)
                }
                focusViewAtBeat(object.beat)
            }
        },

        dragStart(x, y) {
            ;[, active] = tryFind(x, y)
            if (!active) return false

            replaceState({
                ...state.value,
                selectedEntities: [active],
            })
            view.entities = {
                hovered: [],
                creating: [],
            }
            focusViewAtBeat(active.beat)

            notify(interpolate(() => i18n.value.tools.values.moving, '1', objectName))
            return true
        },

        dragUpdate(x, y) {
            if (!active) return

            setViewHover(x, y)

            view.entities = {
                hovered: [],
                creating: [
                    toEntity({
                        beat: yToValidBeat(y),
                        value: active.value,
                    }),
                ],
            }
        },

        dragEnd(x, y) {
            if (!active) return

            editMoveOrReplace(active, {
                beat: yToValidBeat(y),
                value: active.value,
            })

            active = undefined
        },
    }
}

export const createStageValueTool = <T extends ValueEntityType>(
    objectName: () => string,
    showPropertiesModal: (
        object: StageValueObject | TimeScaleEntity,
    ) => Promise<StageValueObject | undefined>,

    defaultValue: number,

    type: 'timeScale',
    toEntity: (object: StageValueObject) => TimeScaleEntity,
    addEntity: AddMutation<StageValueObject>,
    removeEntity: RemoveMutation<TimeScaleEntity>,
): Tool => {
    const find = (beat: number): any =>
        getInStoreGrid(store.value.grid, "timeScale", beat)?.find((entity) => entity.beat === beat && entity.stage === view.stage)

    const tryFind = (
        x: number,
        y: number,
    ): [true, TimeScaleEntity] | [false, undefined, number] => {
        const [hit] = hitEntitiesAtPoint(x, y)
            .filter((entity): entity is TimeScaleEntity => entity.type === type && entity.stage === view.stage)
            .sort(
                (a, b) => +selectedEntities.value.includes(b) - +selectedEntities.value.includes(a),
            )
        if (hit) return [true, hit]

        const beat = yToValidBeat(y)
        const nearest = find(beat)
        if (nearest) return [true, nearest]

        return [false, undefined, beat]
    }

    const editMoveOrReplace = (entity: TimeScaleEntity, object: StageValueObject) => {
        if (entity.beat === object.beat && entity.stage === object.stage) {
            edit(entity, object)
            return
        }

        const overlap = find(object.beat)
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
        console.log(transaction)
        pushState(interpolate(message, `${selectedEntities.length}`, objectName), {
            ...transaction.commit(),
            selectedEntities,
        })
        view.entities = {
            hovered: [],
            creating: [],
        }

        notify(interpolate(message, `${selectedEntities.length}`, objectName))
    }

    const add = (object: StageValueObject) => {
        update(
            () => i18n.value.tools.values.added,
            (transaction) => {
                console.log("add")
                return addEntity(transaction, object)
            },
        )
    }

    const edit = (entity: TimeScaleEntity, object: StageValueObject) => {
        update(
            () => i18n.value.tools.values.edited,
            (transaction) => {
                console.log("edit")
                removeEntity(transaction, entity)
                return addEntity(transaction, object)
            },
        )
    }

    const move = (object: StageValueObject, old: TimeScaleEntity) => {
        update(
            () => i18n.value.tools.values.moved,
            (transaction) => {
                console.log("move")
                if (old.beat) removeEntity(transaction, old)
                return addEntity(transaction, object)
            },
        )
    }

    const replace = (entity: TimeScaleEntity, object: StageValueObject, old: TimeScaleEntity) => {
        update(
            () => i18n.value.tools.values.replaced,
            (transaction) => {
                console.log("replace")
                if (old.beat) removeEntity(transaction, old)
                removeEntity(transaction, entity)
                return addEntity(transaction, object)
            },
        )
    }

    let active: TimeScaleEntity | undefined

    return {
        hover(x, y) {
            const [result, entity, beat] = tryFind(x, y)
            if (result) {
                view.entities = {
                    hovered: [entity],
                    creating: [],
                }
            } else {
                view.entities = {
                    hovered: [],
                    creating: [
                        toEntity({
                            beat,
                            value: defaultValue,
                            stage: view.stage
                        }),
                    ],
                }
            }
        },

        async tap(x, y) {
            const [result, entity, beat] = tryFind(x, y)
            if (result) {
                replaceState({
                    ...state.value,
                    selectedEntities: [entity],
                })
                view.entities = {
                    hovered: [],
                    creating: [],
                }
                focusViewAtBeat(entity.beat)

                const object = await showPropertiesModal(entity)
                if (!object) return

                editMoveOrReplace(entity, object)
            } else {
                replaceState({
                    ...state.value,
                    selectedEntities: [],
                })
                view.entities = {
                    hovered: [],
                    creating: [
                        toEntity({
                            beat,
                            value: defaultValue,
                            stage: view.stage
                        }),
                    ],
                }
                focusViewAtBeat(beat)

                const object = await showPropertiesModal({
                    beat,
                    value: defaultValue,
                    stage: view.stage
                })
                if (!object) return

                const overlap = find(object.beat)
                if (overlap) {
                    console.log(overlap)
                    edit(overlap, object)
                } else {
                    add(object)
                }
                focusViewAtBeat(object.beat)
            }
        },

        dragStart(x, y) {
            ;[, active] = tryFind(x, y)
            if (!active) return false

            replaceState({
                ...state.value,
                selectedEntities: [active],
            })
            view.entities = {
                hovered: [],
                creating: [],
            }
            focusViewAtBeat(active.beat)

            notify(interpolate(() => i18n.value.tools.values.moving, '1', objectName))
            return true
        },

        dragUpdate(x, y) {
            if (!active) return

            setViewHover(x, y)

            view.entities = {
                hovered: [],
                creating: [
                    toEntity({
                        beat: yToValidBeat(y),
                        value: active.value,
                        stage: active.stage
                    }),
                ],
            }
        },

        dragEnd(x, y) {
            if (!active) return

            editMoveOrReplace(active, {
                beat: yToValidBeat(y),
                value: active.value,
                stage: active.stage
            })

            active = undefined
        },
    }
}
