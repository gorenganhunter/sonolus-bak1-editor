import type { Range } from '../../utils/range'
import type { EntityOfType } from '../entities'
import type { HoldNoteJointEntityType } from '../entities/holdNotes/joints'

export type HoldNoteRanges = {
    [T in HoldNoteJointEntityType]: Map<object, Range<EntityOfType<T>>>
}
