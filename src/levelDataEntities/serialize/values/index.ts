import { EngineArchetypeDataName } from '@sonolus/core'
import type { ValueEntity } from '../../../state/entities/values'
import type { TimeScaleEntity } from '../../../state/entities/values/timeScale'

export const serializeLevelDataValueEntities = (
    entities: ValueEntity[],
    archetype: string,
    valueName: string,
) =>
    entities.map((entity) => ({
        archetype,
        data: [
            {
                name: EngineArchetypeDataName.Beat,
                value: entity.beat,
            },
            {
                name: valueName,
                value: entity.value,
            },
        ],
    }))

// export const serializeLevelDataStageValueEntities = (
//     entities: TimeScaleEntity[],
//     archetype: string,
//     valueName: string,
//     getName: () => string
// ) => {
//     const ts = {}
//     entities.forEach(t => {
//         if (ts[t.stage]) ts[t.stage].push(t)
//         else ts[t.stage] = [t]
//     })
//     Object.entries(ts).map(([id, t]: any) => ([parseInt(id), t.sort((a: any, b: any) => a.beat - b.beat)])).map(([id, entities]) => {
//         entities.map((entity: TimeScaleEntity) => ({
//             archetype,
//             data: [
//                 {
//                     name: EngineArchetypeDataName.Beat,
//                     value: entity.beat,
//                 },
//                 {
//                     name: valueName,
//                     value: entity.value,
//                 },
//                 {
//                     name: "stage",
//                     ref: `stage${entity.stage}`
//                 },
//                 {
//
//                 }
//             ],
//         }))
//     })
// }
