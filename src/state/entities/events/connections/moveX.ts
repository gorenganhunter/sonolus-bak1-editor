import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { MoveXEventJointEntity } from '../joints/moveX'

export type MoveXEventConnectionEntity = BaseEventConnectionEntity<MoveXEventJointEntity> & {
    type: 'moveXEventConnection'
}

export const toMoveXEventConnectionEntity = (
    min: MoveXEventJointEntity,
    max: MoveXEventJointEntity,
): MoveXEventConnectionEntity => ({
    type: 'moveXEventConnection',
    ...toEventConnectionEntity(min, max),
})
