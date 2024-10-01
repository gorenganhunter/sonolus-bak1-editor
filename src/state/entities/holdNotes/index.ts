import type { HoldNoteConnectionEntity } from './connections'
import type { HoldNoteJointEntity } from './joints'

export type HoldNoteEntity = HoldNoteJointEntity | HoldNoteConnectionEntity

export type HoldNoteEntityType = HoldNoteEntity['type']

declare const idBrand: unique symbol

export type HoldNoteId = { [idBrand]: never }

export const createHoldNoteId = () => ({}) as HoldNoteId
