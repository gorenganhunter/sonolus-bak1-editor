import { EngineArchetypeDataName } from '@sonolus/core'
import type { FlickNoteEntity } from '../../../state/entities/notes/flickNote'

export const serializeLevelDataFlickNotes = (flickNotes: FlickNoteEntity[]) =>
    flickNotes.map((flickNote) => ({
        archetype: 'FlickNote',
        data: [
            {
                name: EngineArchetypeDataName.Beat,
                value: flickNote.beat,
            },
            {
                name: 'lane',
                value: flickNote.lane,
            },
            {
                name: 'size',
                value: flickNote.size,
            },
            {
                name: "stage",
                ref: "stage" + flickNote.stage
            }
        ],
    }))
