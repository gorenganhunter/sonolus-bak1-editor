import { createVisibility } from '.'
import { judgeMoveXEvent } from '../events/judgeMoveX'

export const judgeMoveXEventVisibility = createVisibility('judgeMoveXEvent', judgeMoveXEvent.icon)
