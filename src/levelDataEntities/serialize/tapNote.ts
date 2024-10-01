import { EngineArchetypeDataName } from '@sonolus/core'
import type { TapNoteEntity } from '../../state/entities/tapNote'

export const serializeLevelDataTapNotes = (tapNotes: TapNoteEntity[]) =>
    tapNotes.map((tapNote) => ({
        archetype: 'TapNote',
        data: [
            {
                name: EngineArchetypeDataName.Beat,
                value: tapNote.beat,
            },
            {
                name: 'color',
                value: tapNote.color,
            },
            {
                name: 'lane',
                value: tapNote.lane,
            },
        ],
    }))
