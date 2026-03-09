import { createVisibility } from '.'
import { judgeResizeEvent } from '../events/judgeResize'

export const judgeResizeEventVisibility = createVisibility('judgeResizeEvent', judgeResizeEvent.icon)
