import type { BaseEntity } from '../..'
import type { Range } from '../../../../utils/range'
import type { EventJointEntity } from '../joints'
import type { JudgeMoveXEventConnectionEntity } from './judgeMoveX'
import type { JudgeMoveYEventConnectionEntity } from './judgeMoveY'
import type { JudgeResizeEventConnectionEntity } from './judgeResize'
import type { JudgeRotateEventConnectionEntity } from './judgeRotate'
import type { SpawnMoveXEventConnectionEntity } from './spawnMoveX'
import type { SpawnMoveYEventConnectionEntity } from './spawnMoveY'
import type { SpawnResizeEventConnectionEntity } from './spawnResize'
import type { SpawnRotateEventConnectionEntity } from './spawnRotate'
import type { TransparentEventConnectionEntity } from './transparent'
import type { NoteHEventConnectionEntity } from './noteH'

export type EventConnectionEntity = JudgeMoveXEventConnectionEntity | JudgeMoveYEventConnectionEntity | JudgeResizeEventConnectionEntity | JudgeRotateEventConnectionEntity | SpawnMoveXEventConnectionEntity | SpawnMoveYEventConnectionEntity | SpawnResizeEventConnectionEntity | SpawnRotateEventConnectionEntity | TransparentEventConnectionEntity | NoteHEventConnectionEntity

export type EventConnectionEntityType = EventConnectionEntity['type']

export type BaseEventConnectionEntity<T extends EventJointEntity> = BaseEntity & Range<T> & { stage: number }

export const toEventConnectionEntity = <T extends EventJointEntity>(min: T, max: T) => ({
    beat: min.beat,
    stage: min.stage,
    min,
    max,
})
