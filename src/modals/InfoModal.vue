<script setup lang="ts">
import { i18n } from '../i18n'
import BaseModal from './BaseModal.vue'

defineProps<{
    title: () => string
    message: () => string
}>()

defineEmits<{
    close: []
}>()
</script>

<template>
    <BaseModal :title="title()" @close="$emit('close')">
        <div>{{ message() }}</div>

        <div class="flex justify-end">
            <button
                class="w-32 bg-[#222] px-2 py-1 transition-colors hover:bg-[#444] active:bg-[#111]"
                @click="$emit('close')"
            >
                {{ i18n.modals.info.ok }}
            </button>
        </div>
    </BaseModal>
</template>
