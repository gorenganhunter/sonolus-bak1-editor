import { createVisibility } from '.'
import { spawnRotateEvent } from '../events/spawnRotate'

export const spawnRotateEventVisibility = createVisibility('spawnRotateEvent', spawnRotateEvent.icon)
