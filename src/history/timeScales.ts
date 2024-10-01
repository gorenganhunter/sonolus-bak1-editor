import { computed } from 'vue'
import { state } from '.'

export const timeScales = computed(() => state.value.timeScales)
