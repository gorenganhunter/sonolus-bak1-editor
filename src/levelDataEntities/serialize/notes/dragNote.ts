import { EngineArchetypeDataName } from '@sonolus/core'
import type { DragNoteEntity } from '../../../state/entities/notes/dragNote'

export const serializeLevelDataDragNotes = (dragNotes: DragNoteEntity[]) =>
    dragNotes.map((dragNote) => ({
        archetype: 'DragNote',
        data: [
            {
                name: EngineArchetypeDataName.Beat,
                value: dragNote.beat,
            },
            {
                name: 'lane',
                value: dragNote.lane,
            },
            {
                name: 'size',
                value: dragNote.size,
            },
            {
                name: "stage",
                ref: "stage" + dragNote.stage
            }
        ],
    }))
