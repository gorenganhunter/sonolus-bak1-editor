import type {
    EventObject,
    NoteObject,
    ValueObject,
    StageValueObject
} from '../../../chart'
import { pushState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { i18n } from '../../../i18n'
import type { Entity } from '../../../state/entities'
import type { JudgeRotateEventJointEntity } from '../../../state/entities/events/joints/judgeRotate'
import type { JudgeResizeEventJointEntity } from '../../../state/entities/events/joints/judgeResize'
import type { JudgeMoveXEventJointEntity } from '../../../state/entities/events/joints/judgeMoveX'
import type { JudgeMoveYEventJointEntity } from '../../../state/entities/events/joints/judgeMoveY'
import type { SpawnRotateEventJointEntity } from '../../../state/entities/events/joints/spawnRotate'
import type { SpawnResizeEventJointEntity } from '../../../state/entities/events/joints/spawnResize'
import type { SpawnMoveXEventJointEntity } from '../../../state/entities/events/joints/spawnMoveX'
import type { SpawnMoveYEventJointEntity } from '../../../state/entities/events/joints/spawnMoveY'
import type { TransparentEventJointEntity } from '../../../state/entities/events/joints/transparent'
import type { NoteHEventJointEntity } from '../../../state/entities/events/joints/noteH'
// import type { TapNoteEntity } from '../../../state/entities/notes/tapNote'
// import type { DragNoteEntity } from '../../../state/entities/notes/dragNote'
// import type { FlickNoteEntity } from '../../../state/entities/notes/flickNote'
// import type { HoldNoteEntity } from '../../../state/entities/notes/holdNote'
import type { BpmEntity } from '../../../state/entities/values/bpm'
import type { TimeScaleEntity } from '../../../state/entities/values/timeScale'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { editJudgeRotateEventJoint, editSelectedJudgeRotateEventJoint } from '../../tools/events/judgeRotate'
import { editJudgeResizeEventJoint, editSelectedJudgeResizeEventJoint } from '../../tools/events/judgeResize'
import { editJudgeMoveXEventJoint, editSelectedJudgeMoveXEventJoint } from '../../tools/events/judgeMoveX'
import { editJudgeMoveYEventJoint, editSelectedJudgeMoveYEventJoint } from '../../tools/events/judgeMoveY'
import { editSpawnRotateEventJoint, editSelectedSpawnRotateEventJoint } from '../../tools/events/spawnRotate'
import { editSpawnResizeEventJoint, editSelectedSpawnResizeEventJoint } from '../../tools/events/spawnResize'
import { editSpawnMoveXEventJoint, editSelectedSpawnMoveXEventJoint } from '../../tools/events/spawnMoveX'
import { editSpawnMoveYEventJoint, editSelectedSpawnMoveYEventJoint } from '../../tools/events/spawnMoveY'
import { editTransparentEventJoint, editSelectedTransparentEventJoint } from '../../tools/events/transparent'
import { editNoteHEventJoint, editSelectedNoteHEventJoint } from '../../tools/events/noteH'
// import { editSelectedTapNote, editTapNote } from '../../tools/tapNote'
// import { editSelectedDragNote, editDragNote } from '../../tools/dragNote'
// import { editSelectedFlickNote, editFlickNote } from '../../tools/flickNote'
// import { editSelectedHoldNote, editHoldNote } from '../../tools/holdNote'
import { editBpm, editSelectedBpm } from '../../tools/values/bpm'
import { editSelectedTimeScale, editTimeScale } from '../../tools/values/timeScale'
import { view } from '../../view'
import type { NoteEntity } from '../../../state/entities/slides/note'
import { editNote, editSelectedNote } from '../../tools/note'

export type EditableObject = Partial<
    EventObject &
    NoteObject &
    ValueObject &
    StageValueObject
>

export type EditableEntity =
    | BpmEntity
    | TimeScaleEntity
    | JudgeRotateEventJointEntity
    | JudgeResizeEventJointEntity
    | JudgeMoveXEventJointEntity
    | JudgeMoveYEventJointEntity
    | SpawnRotateEventJointEntity
    | SpawnResizeEventJointEntity
    | SpawnMoveXEventJointEntity
    | SpawnMoveYEventJointEntity
    | TransparentEventJointEntity
    | NoteHEventJointEntity
    | NoteEntity

export const isEditableEntity = (entity: Entity) =>
    entity.type === 'bpm' ||
    entity.type === 'timeScale' ||
    entity.type === 'judgeRotateEventJoint' ||
    entity.type === 'judgeResizeEventJoint' ||
    entity.type === 'judgeMoveXEventJoint' ||
    entity.type === 'judgeMoveYEventJoint' ||
    entity.type === 'spawnRotateEventJoint' ||
    entity.type === 'spawnResizeEventJoint' ||
    entity.type === 'spawnMoveXEventJoint' ||
    entity.type === 'spawnMoveYEventJoint' ||
    entity.type === 'transparentEventJoint' ||
    entity.type === 'noteHEventJoint' ||
    entity.type === 'note'

export const editSelectedEditableEntities = (object: EditableObject) => {
    if (selectedEntities.value.length === 1) {
        const editEntity = getEditEntity()

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const entity = selectedEntities.value[0]!
        editEntity[entity.type]?.(entity as never, object)
    } else {
        const editSelectedEntity = getEditSelectedEntity()

        const transaction = createTransaction(state.value)

        const entities = selectedEntities.value.flatMap(
            (entity) =>
                editSelectedEntity[entity.type]?.(transaction, entity as never, object) ?? [entity],
        )

        pushState(
            interpolate(
                () => i18n.value.sidebar.default.edited,
                `${selectedEntities.value.length}`,
            ),
            {
                ...transaction.commit(selectedEntities.value),
                selectedEntities: entities,
            },
        )
        view.entities = {
            hovered: [],
            creating: [],
        }

        notify(
            interpolate(
                () => i18n.value.sidebar.default.edited,
                `${selectedEntities.value.length}`,
            ),
        )
    }
}

let editEntity:
    | {
        [T in Entity as T['type']]?: (entity: T, object: EditableObject) => void
    }
    | undefined

const getEditEntity = () =>
(editEntity ??= {
    bpm: editBpm,
    timeScale: editTimeScale,

    judgeRotateEventJoint: editJudgeRotateEventJoint,
    judgeResizeEventJoint: editJudgeResizeEventJoint,
    judgeMoveXEventJoint: editJudgeMoveXEventJoint,
    judgeMoveYEventJoint: editJudgeMoveYEventJoint,
    spawnRotateEventJoint: editSpawnRotateEventJoint,
    spawnResizeEventJoint: editSpawnResizeEventJoint,
    spawnMoveXEventJoint: editSpawnMoveXEventJoint,
    spawnMoveYEventJoint: editSpawnMoveYEventJoint,
    transparentEventJoint: editTransparentEventJoint,
    noteHEventJoint: editNoteHEventJoint,
    note: editNote
})

let editSelectedEntity:
    | {
        [T in Entity as T['type']]?: (
            transaction: Transaction,
            entity: T,
            object: EditableObject,
        ) => Entity[]
    }
    | undefined

const getEditSelectedEntity = () =>
(editSelectedEntity ??= {
    bpm: editSelectedBpm,
    timeScale: editSelectedTimeScale,

    judgeRotateEventJoint: editSelectedJudgeRotateEventJoint,
    judgeResizeEventJoint: editSelectedJudgeResizeEventJoint,
    judgeMoveXEventJoint: editSelectedJudgeMoveXEventJoint,
    judgeMoveYEventJoint: editSelectedJudgeMoveYEventJoint,
    spawnRotateEventJoint: editSelectedSpawnRotateEventJoint,
    spawnResizeEventJoint: editSelectedSpawnResizeEventJoint,
    spawnMoveXEventJoint: editSelectedSpawnMoveXEventJoint,
    spawnMoveYEventJoint: editSelectedSpawnMoveYEventJoint,
    transparentEventJoint: editSelectedTransparentEventJoint,
    noteHEventJoint: editSelectedNoteHEventJoint,

    note: editSelectedNote,
})
