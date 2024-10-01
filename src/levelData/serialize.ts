import type { LevelData } from '@sonolus/core'
import type { Store } from '../state/store'
import { serializeStore } from '../state/store/serialize'

export const serializeLevelData = (bgmOffset: number, store: Store): LevelData => ({
    bgmOffset,
    entities: [
        {
            archetype: 'Initialization',
            data: [],
        },
        {
            archetype: 'Stage',
            data: [],
        },
        ...serializeStore(store),
    ],
})
