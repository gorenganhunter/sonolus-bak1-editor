import { computed } from 'vue'
import { state } from '.'

export const stages = computed(() => state.value.store.stages)
