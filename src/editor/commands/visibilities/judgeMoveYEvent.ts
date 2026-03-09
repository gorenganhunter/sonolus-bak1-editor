import { createVisibility } from '.'
import { judgeMoveYEvent } from '../events/judgeMoveY'

export const judgeMoveYEventVisibility = createVisibility('judgeMoveYEvent', judgeMoveYEvent.icon)
