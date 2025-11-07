import type {
    EventObject,
    BaseNoteObject,
    HoldNoteObject,
    ValueObject,
    StageValueObject
} from '../../../chart'
import { pushState, state } from '../../../history'
import { selectedEntities } from '../../../history/selectedEntities'
import { i18n } from '../../../i18n'
import type { Entity } from '../../../state/entities'
import type { RotateEventJointEntity } from '../../../state/entities/events/joints/rotate'
import type { ResizeEventJointEntity } from '../../../state/entities/events/joints/resize'
import type { TransparentEventJointEntity } from '../../../state/entities/events/joints/transparent'
import type { MoveXEventJointEntity } from '../../../state/entities/events/joints/moveX'
import type { MoveYEventJointEntity } from '../../../state/entities/events/joints/moveY'
import type { TapNoteEntity } from '../../../state/entities/notes/tapNote'
import type { DragNoteEntity } from '../../../state/entities/notes/dragNote'
import type { FlickNoteEntity } from '../../../state/entities/notes/flickNote'
import type { HoldNoteEntity } from '../../../state/entities/notes/holdNote'
import type { BpmEntity } from '../../../state/entities/values/bpm'
import type { TimeScaleEntity } from '../../../state/entities/values/timeScale'
import { createTransaction, type Transaction } from '../../../state/transaction'
import { interpolate } from '../../../utils/interpolate'
import { notify } from '../../notification'
import { editRotateEventJoint, editSelectedRotateEventJoint } from '../../tools/events/rotate'
import { editResizeEventJoint, editSelectedResizeEventJoint } from '../../tools/events/resize'
import { editTransparentEventJoint, editSelectedTransparentEventJoint } from '../../tools/events/transparent'
import { editMoveXEventJoint, editSelectedMoveXEventJoint } from '../../tools/events/moveX'
import { editMoveYEventJoint, editSelectedMoveYEventJoint } from '../../tools/events/moveY'
import { editSelectedTapNote, editTapNote } from '../../tools/tapNote'
import { editSelectedDragNote, editDragNote } from '../../tools/dragNote'
import { editSelectedFlickNote, editFlickNote } from '../../tools/flickNote'
import { editSelectedHoldNote, editHoldNote } from '../../tools/holdNote'
import { editBpm, editSelectedBpm } from '../../tools/values/bpm'
import { editSelectedTimeScale, editTimeScale } from '../../tools/values/timeScale'
import { view } from '../../view'

export type EditableObject = Partial<
    EventObject &
    BaseNoteObject &
    HoldNoteObject &
    ValueObject &
    StageValueObject
>

export type EditableEntity =
    | BpmEntity
    | TimeScaleEntity
    | RotateEventJointEntity
    | ResizeEventJointEntity
    | TransparentEventJointEntity
    | MoveXEventJointEntity
    | MoveYEventJointEntity
    | TapNoteEntity
    | DragNoteEntity
    | FlickNoteEntity
    | HoldNoteEntity

export const isEditableEntity = (entity: Entity) =>
    entity.type === 'bpm' ||
    entity.type === 'timeScale' ||
    entity.type === 'rotateEventJoint' ||
    entity.type === 'resizeEventJoint' ||
    entity.type === 'transparentEventJoint' ||
    entity.type === 'tapNote' ||
    entity.type === 'dragNote' ||
    entity.type === 'flickNote' ||
    entity.type === 'holdNote'

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
                ...transaction.commit(),
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

    rotateEventJoint: editRotateEventJoint,
    resizeEventJoint: editResizeEventJoint,
    transparentEventJoint: editTransparentEventJoint,
    moveXEventJoint: editMoveXEventJoint,
    moveYEventJoint: editMoveYEventJoint,

    tapNote: editTapNote,
    dragNote: editDragNote,
    flickNote: editFlickNote,
    holdNote: editHoldNote
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

    rotateEventJoint: editSelectedRotateEventJoint,
    resizeEventJoint: editSelectedResizeEventJoint,
    transparentEventJoint: editSelectedTransparentEventJoint,
    moveXEventJoint: editSelectedMoveXEventJoint,
    moveYEventJoint: editSelectedMoveYEventJoint,

    tapNote: editSelectedTapNote,
    dragNote: editSelectedDragNote,
    flickNote: editSelectedFlickNote,
    holdNote: editSelectedHoldNote
})
