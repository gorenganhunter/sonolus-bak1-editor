import type { Command } from '..'
import { pushState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { i18n } from '../../../i18n'
import type { Entity } from '../../../state/entities'
import type { JudgeRotateEventJointEntity } from '../../../state/entities/events/joints/judgeRotate'
import { addJudgeMoveXEventJoint, removeJudgeMoveXEventJoint } from '../../../state/mutations/events/judgeMoveX'
import { addJudgeRotateEventJoint, removeJudgeRotateEventJoint } from '../../../state/mutations/events/judgeRotate'
import type { SpawnRotateEventJointEntity } from '../../../state/entities/events/joints/spawnRotate'
import { addSpawnMoveXEventJoint, removeSpawnMoveXEventJoint } from '../../../state/mutations/events/spawnMoveX'
import { addSpawnRotateEventJoint, removeSpawnRotateEventJoint } from '../../../state/mutations/events/spawnRotate'
import { getInStoreGrid } from '../../../state/store/grid'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { mod } from '../../../utils/math'
import { notify } from '../../notification'
import { view } from '../../view'
import FlipIcon from './FlipIcon.vue'
import { replaceNote } from '../../../state/mutations/slides/note'

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

        let first: JudgeRotateEventJointEntity | SpawnRotateEventJointEntity | undefined
        for (const entity of entities) {
            if (entity.type !== 'judgeRotateEventJoint' && entity.type !== 'spawnRotateEventJoint') continue
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
    judgeRotateEventJoint: (transaction, entity, center) => {
        const value = center - (entity.value - center)
        if (value === entity.value) return

        removeJudgeRotateEventJoint(transaction, entity)
        return addJudgeRotateEventJoint(transaction, {
            beat: entity.beat,
            value,
            ease: entity.ease,
            stage: entity.stage
        })
    },

    judgeMoveXEventJoint: (transaction, entity) => {
        const value = -entity.value
        if (value === entity.value) return

        removeJudgeMoveXEventJoint(transaction, entity)
        return addJudgeMoveXEventJoint(transaction, {
            beat: entity.beat,
            value,
            ease: entity.ease,
            stage: entity.stage
        })
    },

    spawnRotateEventJoint: (transaction, entity, center) => {
        const value = center - (entity.value - center)
        if (value === entity.value) return

        removeSpawnRotateEventJoint(transaction, entity)
        return addSpawnRotateEventJoint(transaction, {
            beat: entity.beat,
            value,
            ease: entity.ease,
            stage: entity.stage
        })
    },

    spawnMoveXEventJoint: (transaction, entity) => {
        const value = -entity.value
        if (value === entity.value) return

        removeSpawnMoveXEventJoint(transaction, entity)
        return addSpawnMoveXEventJoint(transaction, {
            beat: entity.beat,
            value,
            ease: entity.ease,
            stage: entity.stage
        })
    },

    note: (transaction, entity) => {
        const lane = -entity.lane + 1

        return replaceNote(transaction, entity, {
            ...entity,
            lane
        })
    },
}
