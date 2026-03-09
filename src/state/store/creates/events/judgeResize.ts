import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toJudgeResizeEventConnectionEntity } from '../../../entities/events/connections/judgeResize'
import { toJudgeResizeEventJointEntity } from '../../../entities/events/joints/judgeResize'
import type { StoreGrid } from '../../grid'

export const createStoreJudgeResizeEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.judgeResizeEvents,
        toJudgeResizeEventJointEntity,
        toJudgeResizeEventConnectionEntity,
    )
