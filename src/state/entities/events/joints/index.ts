import type { BaseEntity } from '../..'
import type { Ease, EventObject } from '../../../../chart'
import type { JudgeMoveXEventJointEntity } from './judgeMoveX'
import type { JudgeMoveYEventJointEntity } from './judgeMoveY'
import type { JudgeResizeEventJointEntity } from './judgeResize'
import type { JudgeRotateEventJointEntity } from './judgeRotate'
import type { SpawnMoveXEventJointEntity } from './spawnMoveX'
import type { SpawnMoveYEventJointEntity } from './spawnMoveY'
import type { SpawnResizeEventJointEntity } from './spawnResize'
import type { SpawnRotateEventJointEntity } from './spawnRotate'
import type { TransparentEventJointEntity } from './transparent'
import type { NoteHEventJointEntity } from './noteH'

export type EventJointEntity = JudgeMoveXEventJointEntity | JudgeMoveYEventJointEntity | JudgeResizeEventJointEntity | JudgeRotateEventJointEntity | SpawnMoveXEventJointEntity | SpawnMoveYEventJointEntity | SpawnResizeEventJointEntity | SpawnRotateEventJointEntity | TransparentEventJointEntity | NoteHEventJointEntity

export type EventJointEntityType = EventJointEntity['type']

export type BaseEventJointEntity = BaseEntity & {
    value: number
    ease: Ease
    stage: number
}

export const toEventJointEntity = (object: EventObject, hitboxLane: number) => ({
    hitbox: {
        lane: hitboxLane,
        beat: object.beat,
        w: 0.1,
        t: 0.1,
        b: 0.1,
    },

    beat: object.beat,
    value: object.value,
    ease: object.ease,
    stage: object.stage
})
