import type { Command } from '..'
import { pushState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { i18n } from '../../../i18n'
import type { Entity } from '../../../state/entities'
import type { RotateEventJointEntity } from '../../../state/entities/events/joints/rotate'
import { addMoveXEventJoint, removeMoveXEventJoint } from '../../../state/mutations/events/moveX'
import { addMoveYEventJoint, removeMoveYEventJoint } from '../../../state/mutations/events/moveY'
import { addRotateEventJoint, removeRotateEventJoint } from '../../../state/mutations/events/rotate'
import { addDragNote, removeDragNote } from '../../../state/mutations/notes/dragNote'
import { addFlickNote, removeFlickNote } from '../../../state/mutations/notes/flickNote'
import { addHoldNote, removeHoldNote } from '../../../state/mutations/notes/holdNote'
import { addTapNote, removeTapNote } from '../../../state/mutations/notes/tapNote'
import { getInStoreGrid } from '../../../state/store/grid'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { mod } from '../../../utils/math'
import { notify } from '../../notification'
import { view } from '../../view'
import FlipIcon from './FlipIcon.vue'

export const flip: Command = {
    title: () => i18n.value.commands.flip.title,
    icon: {
        is: FlipIcon,
    },

    execute() {
        const entities = selectedEntities.value

        if (!entities.length) {
            notify(() => i18n.value.commands.flip.noSelected)
            return
        }

        let first: RotateEventJointEntity | undefined
        for (const entity of entities) {
            if (entity.type !== 'rotateEventJoint') continue
            if (first && entity.beat > first.beat) continue

            first = entity
        }
        const center = Math.floor((first?.value ?? 0) / 360) * 360 + 180

        const transaction = createTransaction(state.value)

        const flippedEntities = entities.flatMap(
            (entity) => flips[entity.type]?.(transaction, entity as never, center) ?? [entity],
        )

        pushState(
            interpolate(() => i18n.value.commands.flip.flipped, `${entities.length}`),
            {
                ...transaction.commit(),
                selectedEntities: flippedEntities,
            },
        )
        view.entities = {
            hovered: [],
            creating: [],
        }

        notify(interpolate(() => i18n.value.commands.flip.flipped, `${entities.length}`))
    },
}

type Flip<T> = (transaction: Transaction, entity: T, center: number) => Entity[] | undefined

const flips: {
    [T in Entity as T['type']]?: Flip<T>
} = {
    rotateEventJoint: (transaction, entity, center) => {
        const value = center - (entity.value - center)
        if (value === entity.value) return

        removeRotateEventJoint(transaction, entity)
        return addRotateEventJoint(transaction, {
            beat: entity.beat,
            value,
            ease: entity.ease,
            stage: entity.stage
        })
    },

    moveXEventJoint: (transaction, entity) => {
        const value = -entity.value
        if (value === entity.value) return

        removeMoveXEventJoint(transaction, entity)
        return addMoveXEventJoint(transaction, {
            beat: entity.beat,
            value,
            ease: entity.ease,
            stage: entity.stage
        })
    },

    moveYEventJoint: (transaction, entity) => {
        const value = -entity.value
        if (value === entity.value) return

        removeMoveYEventJoint(transaction, entity)
        return addMoveYEventJoint(transaction, {
            beat: entity.beat,
            value,
            ease: entity.ease,
            stage: entity.stage
        })
    },

    tapNote: (transaction, entity) => {
        const { beat, size, stage } = entity
        const lane = -(mod(entity.lane, 1) - 0.5) + 0.5 + view.side

        removeTapNote(transaction, entity)

        const overlap = getInStoreGrid(transaction.store.grid, 'tapNote', beat)?.find(
            (entity) => entity.beat === beat && entity.lane === lane && entity.stage === stage,
        )
        if (overlap) removeTapNote(transaction, overlap)

        return addTapNote(transaction, {
            beat,
            lane,
            size,
            stage
        })
    },

    holdNote: (transaction, entity) => {
        const { beat, size, stage, duration } = entity
        const lane = -(mod(entity.lane, 1) - 0.5) + 0.5 + view.side

        removeHoldNote(transaction, entity)

        const overlap = getInStoreGrid(transaction.store.grid, 'holdNote', beat)?.find(
            (entity) => entity.beat === beat && entity.lane === lane && entity.stage === stage,
        )
        if (overlap) removeHoldNote(transaction, overlap)

        return addHoldNote(transaction, {
            beat,
            lane,
            size,
            stage,
            duration
        })
    },

    dragNote: (transaction, entity) => {
        const { beat, size, stage } = entity
        const lane = -(mod(entity.lane, 1) - 0.5) + 0.5 + view.side

        removeDragNote(transaction, entity)

        const overlap = getInStoreGrid(transaction.store.grid, 'dragNote', beat)?.find(
            (entity) => entity.beat === beat && entity.lane === lane && entity.stage === stage,
        )
        if (overlap) removeDragNote(transaction, overlap)

        return addDragNote(transaction, {
            beat,
            lane,
            size,
            stage
        })
    },

    flickNote: (transaction, entity) => {
        const { beat, size, stage } = entity
        const lane = -(mod(entity.lane, 1) - 0.5) + 0.5 + view.side

        removeFlickNote(transaction, entity)

        const overlap = getInStoreGrid(transaction.store.grid, 'flickNote', beat)?.find(
            (entity) => entity.beat === beat && entity.lane === lane && entity.stage === stage,
        )
        if (overlap) removeFlickNote(transaction, overlap)

        return addFlickNote(transaction, {
            beat,
            lane,
            size,
            stage
        })
    },
}
