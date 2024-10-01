import { EngineArchetypeDataName, EngineArchetypeName } from '@sonolus/core'
import { serializeLevelDataValueEntities } from '.'
import type { TimeScaleEntity } from '../../../state/entities/values/timeScale'

export const serializeLevelDataTimeScales = (timeScales: TimeScaleEntity[]) =>
    serializeLevelDataValueEntities(
        timeScales,
        EngineArchetypeName.TimeScaleChange,
        EngineArchetypeDataName.TimeScale,
    )
