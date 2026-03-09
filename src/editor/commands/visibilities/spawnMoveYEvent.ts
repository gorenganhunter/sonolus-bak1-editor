import { createVisibility } from '.'
import { spawnMoveYEvent } from '../events/spawnMoveY'

export const spawnMoveYEventVisibility = createVisibility('spawnMoveYEvent', spawnMoveYEvent.icon)
