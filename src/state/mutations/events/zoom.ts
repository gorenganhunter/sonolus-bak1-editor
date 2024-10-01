import { addEventJoint, removeEventJoint } from '.'
import type { AddMutation, RemoveMutation } from '..'
import type { EventObject } from '../../../chart'
import { toZoomEventConnectionEntity } from '../../entities/events/connections/zoom'
import {
    toZoomEventJointEntity,
    type ZoomEventJointEntity,
} from '../../entities/events/joints/zoom'

export const addZoomEventJoint: AddMutation<EventObject> = ({ store }, object) =>
    addEventJoint(
        store,
        object,
        toZoomEventJointEntity,
        'zoomEventConnection',
        toZoomEventConnectionEntity,
    )

export const removeZoomEventJoint: RemoveMutation<ZoomEventJointEntity> = ({ store }, entity) => {
    removeEventJoint(store, entity, 'zoomEventConnection', toZoomEventConnectionEntity)
}
