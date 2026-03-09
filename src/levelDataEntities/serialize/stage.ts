import { EngineArchetypeDataName, type LevelDataEntity } from "@sonolus/core";
import type { Stage } from "../../chart";
import type { TimeScaleIntegral } from "../../state/integrals/timeScales";
import type { TimeScaleEntity } from "../../state/entities/values/timeScale";

export const serializeLevelDataStages = (stages: Stage[], timeScales: TimeScaleEntity[], getName: () => string) => {
    const arr: LevelDataEntity[] = []
    stages.forEach((stg) => {
        const stage: LevelDataEntity = {
            archetype: 'BAK1Stage',
            data: [],
            name: "stage" + stg.id
        }
        const tsg: LevelDataEntity[] = []
        let lastName: string = getName()

        stage.data.push({
            name: "first",
            ref: lastName
        })

        timeScales.filter(ts => ts.stage === stg.id).sort((a, b) => a.beat - b.beat).forEach((ts, i, a) => {
            const entity: LevelDataEntity = {
                archetype: "StageTimeScaleChange",
                data: [
                    {
                        name: EngineArchetypeDataName.Beat,
                        value: ts.beat,
                    },
                    {
                        name: EngineArchetypeDataName.TimeScale,
                        value: ts.value,
                    },
                    {
                        name: "stage",
                        ref: `stage${ts.stage}`
                    },
                ]
            }
            entity.name = lastName

            if (i < a.length - 1) {
                lastName = getName()
                entity.data.push({
                    name: "next",
                    ref: lastName,
                })
            }

            tsg.push(entity)
        })

        stage.data.push({
            name: "length",
            value: tsg.length
        })

        arr.push(stage, ...tsg)
    })

    return arr
}
