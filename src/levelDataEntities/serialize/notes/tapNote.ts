import { EngineArchetypeDataName } from '@sonolus/core'
import type { TapNoteEntity } from '../../../state/entities/notes/tapNote'

export const serializeLevelDataTapNotes = (tapNotes: TapNoteEntity[]) =>
    tapNotes.map((tapNote) => ({
        archetype: 'TapNote',
        data: [
            {
                name: EngineArchetypeDataName.Beat,
                value: tapNote.beat,
            },
            {
                name: 'lane',
                value: tapNote.lane,
            },
            {
                name: 'size',
                value: tapNote.size,
            },
            {
                name: "stage",
                ref: "stage" + tapNote.stage
            }
        ],
    }))
