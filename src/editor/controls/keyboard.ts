import { onMounted, onUnmounted } from 'vue'
import { modals } from '../../modals'
import { settings } from '../../settings'
import { commands, type CommandName } from '../commands'

const onKeydown = (event: KeyboardEvent) => {
    if (modals.length) return

    for (const [name, key] of Object.entries(settings.keyboardShortcuts) as [
        CommandName,
        string | undefined,
    ][]) {
        if (key !== event.key) continue

        void commands[name].execute()
    }
}

export const useKeyboardControl = () => {
    onMounted(() => {
        addEventListener('keydown', onKeydown)
    })

    onUnmounted(() => {
        removeEventListener('keydown', onKeydown)
    })
}
