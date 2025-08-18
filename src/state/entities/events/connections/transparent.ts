import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { TransparentEventJointEntity } from '../joints/transparent'

export type TransparentEventConnectionEntity = BaseEventConnectionEntity<TransparentEventJointEntity> & {
    type: 'transparentEventConnection'
}

export const toTransparentEventConnectionEntity = (
    min: TransparentEventJointEntity,
    max: TransparentEventJointEntity,
): TransparentEventConnectionEntity => ({
    type: 'transparentEventConnection',
    ...toEventConnectionEntity(min, max),
})
