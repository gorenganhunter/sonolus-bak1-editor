import type {
    NoteType,
} from '../../chart'
import { selectedEntities } from '../../history/selectedEntities'
import type { DefaultNoteSlideProperties } from '../../settings'
import { entries } from '../../utils/object'
import { editSelectedEditableEntities } from '../sidebars/default'

export const quickEdit = (properties: DefaultNoteSlideProperties) => {
    let count = 0
    let key: keyof DefaultNoteSlideProperties | undefined

    for (const [k, v] of entries(properties)) {
        if (v === undefined) continue

        count++
        key = k
    }

    if (count > 1) {
        editSelectedEditableEntities(properties)
        return
    }

    if (!key) return

    let value: unknown
    for (const entity of selectedEntities.value) {
        if (entity.type !== 'note') continue

        if (value === undefined) {
            value = entity[key]
        } else if (value !== entity[key]) {
            value = undefined
            break
        }
    }

    if (value === undefined) {
        editSelectedEditableEntities(properties)
        return
    }

    switch (key) {
        case 'noteType':
            editSelectedEditableEntities({
                noteType: rotate(value as NoteType, [
                    'default',
                    'drag',
                    'flick',
                    'damage',
                ]),
            })
            break
        case 'size':
            editSelectedEditableEntities({ size: value as never })
            break
        case 'isFake':
            editSelectedEditableEntities({ isFake: !value })
            break
    }
}

const rotate = <T>(value: T, values: T[]) => values[(values.indexOf(value) + 1) % values.length]
