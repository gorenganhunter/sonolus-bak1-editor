import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { RotateEventJointEntity } from '../joints/rotate'

export type RotateEventConnectionEntity = BaseEventConnectionEntity<RotateEventJointEntity> & {
    type: 'rotateEventConnection'
}

export const toRotateEventConnectionEntity = (
    min: RotateEventJointEntity,
    max: RotateEventJointEntity,
): RotateEventConnectionEntity => ({
    type: 'rotateEventConnection',
    ...toEventConnectionEntity(min, max),
})
