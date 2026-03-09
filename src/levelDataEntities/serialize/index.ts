import type { LevelDataEntity } from '@sonolus/core'
import type { BpmEntity } from '../../state/entities/values/bpm'
import type { TimeScaleEntity } from '../../state/entities/values/timeScale'
import { serializeLevelDataBpms } from './values/bpm'
// import { serializeLevelDataTimeScales } from './values/timeScale'
import type { Stage } from '../../chart'
import { serializeLevelDataStages } from './stage'
import type { JudgeRotateEventConnectionEntity } from '../../state/entities/events/connections/judgeRotate'
import type { JudgeRotateEventJointEntity } from '../../state/entities/events/joints/judgeRotate'
import type { JudgeResizeEventJointEntity } from '../../state/entities/events/joints/judgeResize'
import type { JudgeResizeEventConnectionEntity } from '../../state/entities/events/connections/judgeResize'
import type { JudgeMoveXEventJointEntity } from '../../state/entities/events/joints/judgeMoveX'
import type { JudgeMoveXEventConnectionEntity } from '../../state/entities/events/connections/judgeMoveX'
import type { JudgeMoveYEventJointEntity } from '../../state/entities/events/joints/judgeMoveY'
import type { JudgeMoveYEventConnectionEntity } from '../../state/entities/events/connections/judgeMoveY'
import { serializeLevelDataJudgeRotateEvents } from './events/judgeRotate'
import { serializeLevelDataJudgeResizeEvents } from './events/judgeResize'
import { serializeLevelDataJudgeMoveYEvents } from './events/judgeMoveY'
import { serializeLevelDataJudgeMoveXEvents } from './events/judgeMoveX'
import { serializeLevelDataSpawnRotateEvents } from './events/spawnRotate'
import { serializeLevelDataSpawnResizeEvents } from './events/spawnResize'
import { serializeLevelDataSpawnMoveYEvents } from './events/spawnMoveY'
import { serializeLevelDataSpawnMoveXEvents } from './events/spawnMoveX'
import { serializeLevelDataTransparentEvents } from './events/transparent'
import { serializeLevelDataNoteHEvents } from './events/noteH'

import { serializeSlidesToLevelDataEntities } from './slide'
import type { Store } from '../../state/store'

export const serializeLevelDataEntities = (
    store: Store
): LevelDataEntity[] => {
    let id = 0
    const getName = () => (id++).toString(16)

    return [
        ...serializeLevelDataBpms([...getStoreEntities(store.grid.bpm)]),
        ...serializeLevelDataStages(store.stages, [...getStoreEntities(store.grid.timeScale)], getName),

        ...serializeLevelDataJudgeRotateEvents([...getStoreEntities(store.grid.judgeRotateEventJoint)], [...getStoreEntities(store.grid.judgeRotateEventConnection)], getName),
        ...serializeLevelDataJudgeResizeEvents([...getStoreEntities(store.grid.judgeResizeEventJoint)], [...getStoreEntities(store.grid.judgeResizeEventConnection)], getName),
        ...serializeLevelDataJudgeMoveXEvents([...getStoreEntities(store.grid.judgeMoveXEventJoint)], [...getStoreEntities(store.grid.judgeMoveXEventConnection)], getName),
        ...serializeLevelDataJudgeMoveYEvents([...getStoreEntities(store.grid.judgeMoveYEventJoint)], [...getStoreEntities(store.grid.judgeMoveYEventConnection)], getName),
        ...serializeLevelDataSpawnRotateEvents([...getStoreEntities(store.grid.spawnRotateEventJoint)], [...getStoreEntities(store.grid.spawnRotateEventConnection)], getName),
        ...serializeLevelDataSpawnResizeEvents([...getStoreEntities(store.grid.spawnResizeEventJoint)], [...getStoreEntities(store.grid.spawnResizeEventConnection)], getName),
        ...serializeLevelDataSpawnMoveXEvents([...getStoreEntities(store.grid.spawnMoveXEventJoint)], [...getStoreEntities(store.grid.spawnMoveXEventConnection)], getName),
        ...serializeLevelDataSpawnMoveYEvents([...getStoreEntities(store.grid.spawnMoveYEventJoint)], [...getStoreEntities(store.grid.spawnMoveYEventConnection)], getName),
        ...serializeLevelDataTransparentEvents([...getStoreEntities(store.grid.transparentEventJoint)], [...getStoreEntities(store.grid.transparentEventConnection)], getName),
        ...serializeLevelDataNoteHEvents([...getStoreEntities(store.grid.noteHEventJoint)], [...getStoreEntities(store.grid.noteHEventConnection)], getName),

        ...serializeSlidesToLevelDataEntities(store, getName),
    ]
}

export const getStoreEntities = <T>(map: Map<number, Set<T>>) => {
    const entities = new Set<T>()

    for (const set of map.values()) {
        for (const entity of set) {
            entities.add(entity)
        }
    }

    return entities
}
