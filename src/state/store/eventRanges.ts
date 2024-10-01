import type { Range } from '../../utils/range'
import type { EntityOfType } from '../entities'
import type { EventJointEntityType } from '../entities/events/joints'

export type EventRanges = {
    [T in EventJointEntityType]?: Range<EntityOfType<T>>
}
