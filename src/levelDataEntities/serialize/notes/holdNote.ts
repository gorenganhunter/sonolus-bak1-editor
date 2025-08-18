import { EngineArchetypeDataName } from '@sonolus/core'
import type { HoldNoteEntity } from '../../../state/entities/notes/holdNote'

export const serializeLevelDataHoldNotes = (holdNotes: HoldNoteEntity[]) =>
    holdNotes.map((holdNote) => ({
        archetype: 'HoldNote',
        data: [
            {
                name: EngineArchetypeDataName.Beat,
                value: holdNote.beat,
            },
            {
                name: 'lane',
                value: holdNote.lane,
            },
            {
                name: 'size',
                value: holdNote.size,
            },
            {
                name: 'duration',
                value: holdNote.duration,
            },
            {
                name: "stage",
                ref: "stage" + holdNote.stage
            }
        ],
    }))
