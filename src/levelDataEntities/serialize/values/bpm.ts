import { EngineArchetypeDataName, EngineArchetypeName } from '@sonolus/core'
import { serializeLevelDataValueEntities } from '.'
import type { BpmEntity } from '../../../state/entities/values/bpm'

export const serializeLevelDataBpms = (bpms: BpmEntity[]) =>
    serializeLevelDataValueEntities(
        bpms,
        EngineArchetypeName.BpmChange,
        EngineArchetypeDataName.Bpm,
    )
