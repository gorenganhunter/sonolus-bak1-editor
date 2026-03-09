import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toJudgeRotateEventConnectionEntity } from '../../../entities/events/connections/judgeRotate'
import { toJudgeRotateEventJointEntity } from '../../../entities/events/joints/judgeRotate'
import type { StoreGrid } from '../../grid'

export const createStoreJudgeRotateEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.judgeRotateEvents,
        toJudgeRotateEventJointEntity,
        toJudgeRotateEventConnectionEntity,
    )
