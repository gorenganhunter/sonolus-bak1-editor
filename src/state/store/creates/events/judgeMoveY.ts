import { createStoreEventEntities } from '.'
import type { Chart } from '../../../../chart'
import { toJudgeMoveYEventConnectionEntity } from '../../../entities/events/connections/judgeMoveY'
import { toJudgeMoveYEventJointEntity } from '../../../entities/events/joints/judgeMoveY'
import type { StoreGrid } from '../../grid'

export const createStoreJudgeMoveYEvents = (grid: StoreGrid, chart: Chart) =>
    createStoreEventEntities(
        grid,
        chart.judgeMoveYEvents,
        toJudgeMoveYEventJointEntity,
        toJudgeMoveYEventConnectionEntity,
    )
