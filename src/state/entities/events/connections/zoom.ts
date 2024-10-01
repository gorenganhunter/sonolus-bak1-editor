import { toEventConnectionEntity, type BaseEventConnectionEntity } from '.'
import type { ZoomEventJointEntity } from '../joints/zoom'

export type ZoomEventConnectionEntity = BaseEventConnectionEntity<ZoomEventJointEntity> & {
    type: 'zoomEventConnection'
}

export const toZoomEventConnectionEntity = (
    min: ZoomEventJointEntity,
    max: ZoomEventJointEntity,
): ZoomEventConnectionEntity => ({
    type: 'zoomEventConnection',
    ...toEventConnectionEntity(min, max),
})
