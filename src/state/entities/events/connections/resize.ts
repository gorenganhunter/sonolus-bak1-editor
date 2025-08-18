import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { ResizeEventJointEntity } from '../joints/resize'

export type ResizeEventConnectionEntity = BaseEventConnectionEntity<ResizeEventJointEntity> & {
    type: 'resizeEventConnection'
}

export const toResizeEventConnectionEntity = (
    min: ResizeEventJointEntity,
    max: ResizeEventJointEntity,
): ResizeEventConnectionEntity => ({
    type: 'resizeEventConnection',
    ...toEventConnectionEntity(min, max),
})
