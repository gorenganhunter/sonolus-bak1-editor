import { createVisibility } from '.'
import { judgeRotateEvent } from '../events/judgeRotate'

export const judgeRotateEventVisibility = createVisibility('judgeRotateEvent', judgeRotateEvent.icon)
