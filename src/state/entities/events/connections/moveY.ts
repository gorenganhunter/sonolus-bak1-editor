import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { MoveYEventJointEntity } from '../joints/moveY'

export type MoveYEventConnectionEntity = BaseEventConnectionEntity<MoveYEventJointEntity> & {
    type: 'moveYEventConnection'
}

export const toMoveYEventConnectionEntity = (
    min: MoveYEventJointEntity,
    max: MoveYEventJointEntity,
): MoveYEventConnectionEntity => ({
    type: 'moveYEventConnection',
    ...toEventConnectionEntity(min, max),
})
