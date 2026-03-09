import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toJudgeMoveXEventConnectionEntity } from '../../../entities/events/connections/judgeMoveX'
import { toJudgeMoveXEventJointEntity } from '../../../entities/events/joints/judgeMoveX'
import type { StoreGrid } from '../../grid'

export const createStoreJudgeMoveXEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.judgeMoveXEvents,
        toJudgeMoveXEventJointEntity,
        toJudgeMoveXEventConnectionEntity,
    )
