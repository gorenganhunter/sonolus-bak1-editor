import { computed } from 'vue'
import { settings } from '../settings'
import { unlerp, remap } from '../utils/math'

export const noteDuration = computed(
    () => 5 / settings.previewNoteSpeed
    //    () => 10 / Math.pow(1.03, (settings.previewNoteSpeed - 1) / 0.1),
)

export const approach = (fromTime: number, toTime: number, topSize: number, bottomSize: number, now: number) =>
    topSize === bottomSize ? unlerp(fromTime, toTime, now) : unlerp((topSize / bottomSize), 1, 1 / remap(fromTime, toTime, 1 / (topSize / bottomSize), 1, now))

