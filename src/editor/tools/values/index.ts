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
import { focusDefaultSidebar, isSidebarVisible } from '../../sidebars'
import { focusViewAtBeat, setViewHover, snapYToBeat, view, yToValidBeat } from '../../view'
import { hitEntitiesAtPoint } from '../utils'

export const createValueTool = <T extends ValueEntityType>(
    objectName: () => string,
    showPropertiesModal: () => Promise<void>,

    defaultValue: number,

    type: T,
    toEntity: (object: ValueObject) => EntityOfType<T>,
    addEntity: AddMutation<ValueObject>,
    removeEntity: RemoveMutation<EntityOfType<T>>,
): [
        Tool,
        (entity: EntityOfType<T>, object: Partial<ValueObject>) => void,
        (transaction: Transaction, entity: EntityOfType<T>, object: Partial<ValueObject>) => Entity[],
    ] => {
    const find = (beat: number) =>
        getInStoreGrid(store.value.grid, type, beat)?.find((entity) => entity.beat === beat)

    const tryFind = (x: number, y: number): [EntityOfType<T>] | [undefined, number] => {
        const [hit] = hitEntitiesAtPoint(type, x, y).sort(
            (a, b) => +selectedEntities.value.includes(b) - +selectedEntities.value.includes(a),
        )
        if (hit) return [hit]

        const beat = yToValidBeat(y)
        const nearest = find(beat)
        if (nearest) return [nearest]

        return [undefined, beat]
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

    let active:
        | {
            type: 'add'
        }
        | {
            type: 'move'
            entity: EntityOfType<T>
        }
        | undefined

    return [
        {
            hover(x, y) {
                const [entity, beat] = tryFind(x, y)
                if (entity) {
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

            tap(x, y, modifiers) {
                const [entity, beat] = tryFind(x, y)
                if (entity) {
                    if (modifiers.ctrl) {
                        const selectedValueEntities: Entity[] = selectedEntities.value.filter(
                            (entity) => entity.type === type,
                        )

                        const targets = selectedValueEntities.includes(entity)
                            ? selectedValueEntities.filter((e) => e !== entity)
                            : [...selectedValueEntities, entity]

                        replaceState({
                            ...state.value,
                            selectedEntities: targets,
                        })
                        view.entities = {
                            hovered: [],
                            creating: [],
                        }
                        focusViewAtBeat(entity.beat)

                        notify(
                            interpolate(
                                () => i18n.value.tools.values.selected,
                                `${targets.length}`,
                                objectName,
                            ),
                        )
                    } else {
                        if (selectedEntities.value.includes(entity)) {
                            focusViewAtBeat(entity.beat)

                            if (isSidebarVisible.value) {
                                focusDefaultSidebar()
                            } else {
                                void showPropertiesModal()
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

                            notify(
                                interpolate(
                                    () => i18n.value.tools.values.selected,
                                    '1',
                                    objectName,
                                ),
                            )
                        }
                    }
                } else {
                    const object: ValueObject = {
                        beat,
                        value: defaultValue,
                    }

                    const overlap = find(object.beat)
                    if (overlap) {
                        edit(overlap, object)
                    } else {
                        add(object)
                    }
                    focusViewAtBeat(object.beat)

                    void showPropertiesModal()
                }
            },

            dragStart(x, y) {
                const [entity, beat] = tryFind(x, y)
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

                    notify(interpolate(() => i18n.value.tools.values.moving, '1', objectName))

                    active = {
                        type: 'move',
                        entity,
                    }
                } else {
                    focusViewAtBeat(beat)

                    notify(interpolate(() => i18n.value.tools.values.adding, '1', objectName))

                    active = {
                        type: 'add',
                    }
                }

                return true
            },

            dragUpdate(x, y) {
                if (!active) return

                setViewHover(x, y)

                switch (active.type) {
                    case 'add': {
                        const [entity, beat] = tryFind(x, y)
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
                                    toEntity({
                                        beat,
                                        value: defaultValue,
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
                                toEntity({
                                    beat,
                                    value: active.entity.value,
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

                switch (active.type) {
                    case 'add': {
                        const [entity, beat] = tryFind(x, y)
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

                            void showPropertiesModal()
                        } else {
                            const object: ValueObject = {
                                beat,
                                value: defaultValue,
                            }

                            const overlap = find(object.beat)
                            if (overlap) {
                                edit(overlap, object)
                            } else {
                                add(object)
                            }
                            focusViewAtBeat(object.beat)

                            void showPropertiesModal()
                        }
                        break
                    }
                    case 'move': {
                        const beat = snapYToBeat(y, active.entity.beat)

                        editMoveOrReplace(active.entity, {
                            beat,
                            value: active.entity.value,
                        })
                        focusViewAtBeat(beat)
                        break
                    }
                }

                active = undefined
            },
        },

        (entity, object) => {
            editMoveOrReplace(entity, {
                beat: object.beat ?? entity.beat,
                value: object.value ?? entity.value,
            })
        },

        (transaction, entity, object) => {
            removeEntity(transaction, entity)
            return addEntity(transaction, {
                beat: object.beat ?? entity.beat,
                value: object.value ?? entity.value,
            })
        },
    ]
}

export const createStageValueTool = <T extends ValueEntityType>(
    objectName: () => string,
    showPropertiesModal: () => Promise<void>,

    defaultValue: number,

    type: T,
    toEntity: (object: StageValueObject) => TimeScaleEntity,
    addEntity: AddMutation<StageValueObject>,
    removeEntity: RemoveMutation<TimeScaleEntity>,
): [
        Tool,
        (entity: EntityOfType<T>, object: Partial<StageValueObject>) => void,
        (transaction: Transaction, entity: EntityOfType<T>, object: Partial<ValueObject>) => Entity[],
    ] => {
    const find = (beat: number): any =>
        getInStoreGrid(store.value.grid, "timeScale", beat)?.find((entity) => entity.beat === beat && entity.stage === view.stage)

    const tryFind = (x: number, y: number): [EntityOfType<T>] | [undefined, number] => {
        const [hit] = hitEntitiesAtPoint(type, x, y)
            .filter((entity: any) => entity.stage === view.stage)
            .sort(
                (a, b) => +selectedEntities.value.includes(b) - +selectedEntities.value.includes(a),
            )
        if (hit) return [hit]

        const beat = yToValidBeat(y)
        const nearest = find(beat)
        if (nearest) return [nearest]

        return [undefined, beat]
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

    let active:
        | {
            type: 'add'
        }
        | {
            type: 'move'
            entity: TimeScaleEntity
        }
        | undefined

    return [
        {
            hover(x, y) {
                const [entity, beat] = tryFind(x, y)
                if (entity) {
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

            tap(x, y, modifiers) {
                const [entity, beat] = tryFind(x, y)
                if (entity) {
                    if (modifiers.ctrl) {
                        const selectedValueEntities: Entity[] = selectedEntities.value.filter(
                            (entity) => entity.type === type,
                        )

                        const targets = selectedValueEntities.includes(entity)
                            ? selectedValueEntities.filter((e) => e !== entity)
                            : [...selectedValueEntities, entity]

                        replaceState({
                            ...state.value,
                            selectedEntities: targets,
                        })
                        view.entities = {
                            hovered: [],
                            creating: [],
                        }
                        focusViewAtBeat(entity.beat)

                        notify(
                            interpolate(
                                () => i18n.value.tools.values.selected,
                                `${targets.length}`,
                                objectName,
                            ),
                        )
                    } else {
                        if (selectedEntities.value.includes(entity)) {
                            focusViewAtBeat(entity.beat)

                            if (isSidebarVisible.value) {
                                focusDefaultSidebar()
                            } else {
                                void showPropertiesModal()
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

                            notify(
                                interpolate(
                                    () => i18n.value.tools.values.selected,
                                    '1',
                                    objectName,
                                ),
                            )
                        }
                    }
                } else {
                    const object: StageValueObject = {
                        beat,
                        value: defaultValue,
                        stage: view.stage
                    }

                    const overlap = find(object.beat)
                    if (overlap) {
                        edit(overlap, object)
                    } else {
                        add(object)
                    }
                    focusViewAtBeat(object.beat)

                    void showPropertiesModal()
                }
            },

            dragStart(x, y) {
                const [entity, beat] = tryFind(x, y)
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

                    notify(interpolate(() => i18n.value.tools.values.moving, '1', objectName))

                    active = {
                        type: 'move',
                        entity,
                    }
                } else {
                    focusViewAtBeat(beat)

                    notify(interpolate(() => i18n.value.tools.values.adding, '1', objectName))

                    active = {
                        type: 'add',
                    }
                }

                return true
            },

            dragUpdate(x, y) {
                if (!active) return

                setViewHover(x, y)

                switch (active.type) {
                    case 'add': {
                        const [entity, beat] = tryFind(x, y)
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
                                    toEntity({
                                        beat,
                                        value: defaultValue,
                                        stage: view.stage
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
                                toEntity({
                                    beat,
                                    value: active.entity.value,
                                    stage: view.stage
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

                switch (active.type) {
                    case 'add': {
                        const [entity, beat] = tryFind(x, y)
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

                            void showPropertiesModal()
                        } else {
                            const object: StageValueObject = {
                                beat,
                                value: defaultValue,
                                stage: view.stage
                            }

                            const overlap = find(object.beat)
                            if (overlap) {
                                edit(overlap, object)
                            } else {
                                add(object)
                            }
                            focusViewAtBeat(object.beat)

                            void showPropertiesModal()
                        }
                        break
                    }
                    case 'move': {
                        const beat = snapYToBeat(y, active.entity.beat)

                        editMoveOrReplace(active.entity, {
                            beat,
                            value: active.entity.value,
                            stage: view.stage
                        })
                        focusViewAtBeat(beat)
                        break
                    }
                }

                active = undefined
            },
        },

        (entity: any, object) => {
            editMoveOrReplace(entity, {
                beat: object.beat ?? entity.beat,
                value: object.value ?? entity.value,
                stage: object.stage ?? entity.stage,
            })
        },

        (transaction, entity: any, object: any) => {
            removeEntity(transaction, entity)
            return addEntity(transaction, {
                beat: object.beat ?? entity.beat,
                value: object.value ?? entity.value,
                stage: object.stage ?? entity.stage,
            })
        },
    ]
}
