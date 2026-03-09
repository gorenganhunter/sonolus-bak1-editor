import { toEventJointEntity, type BaseEventJointEntity } from '.'
import type { EventObject } from '../../../../chart'
import { mod } from '../../../../utils/math'

export type SpawnRotateEventJointEntity = BaseEventJointEntity & {
    type: 'spawnRotateEventJoint'
}

export const toSpawnRotateEventJointEntity = (object: EventObject): SpawnRotateEventJointEntity => ({
    type: 'spawnRotateEventJoint',
    ...toEventJointEntity(object, spawnRotateEventValueToLane(object.value)),
})

export const spawnRotateEventValueToLane = (value: number) => {
    // //console.log(value)
    while (true) {
        if (value < 0) value += 360
        else break
    }
    return ((value + 180) % 360) / 360
}
