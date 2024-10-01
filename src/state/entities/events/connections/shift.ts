import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { ShiftEventJointEntity } from '../joints/shift'

export type ShiftEventConnectionEntity = BaseEventConnectionEntity<ShiftEventJointEntity> & {
    type: 'shiftEventConnection'
}

export const toShiftEventConnectionEntity = (
    min: ShiftEventJointEntity,
    max: ShiftEventJointEntity,
): ShiftEventConnectionEntity => ({
    type: 'shiftEventConnection',
    ...toEventConnectionEntity(min, max),
})
