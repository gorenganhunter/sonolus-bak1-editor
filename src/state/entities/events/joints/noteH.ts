import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { lerp, mod, unlerp } from '../../../../utils/math'

export type NoteHEventJointEntity = BaseEventJointEntity & {
    type: 'noteHEventJoint'
}

export const toNoteHEventJointEntity = (object: EventObject): NoteHEventJointEntity => ({
    type: 'noteHEventJoint',
    ...toEventJointEntity(object, noteHEventValueToLane(object.value)),
})

export const noteHEventValueToLane = (value: number) => lerp(0.5, 0, value)

export const laneToNoteHEventValue = (lane: number) => unlerp(0.5, 0, lane)
