import type { HoldNoteId } from '..'
import type { BaseEntity } from '../..'
import type { DoubleHoldNoteJointEntity } from './double'
import type { SingleHoldNoteJointEntity } from './single'

export type HoldNoteJointEntity = SingleHoldNoteJointEntity | DoubleHoldNoteJointEntity

export type HoldNoteJointEntityType = HoldNoteJointEntity['type']

export type BaseHoldNoteJointEntity = BaseEntity & {
    id: HoldNoteId
}
