<script setup lang="ts">
import { i18n } from '../../i18n'
import BaseModal from '../BaseModal.vue'

defineProps<{
    title: string
}>()

defineEmits<{
    submit: []
    close: []
}>()
</script>

<template>
    <BaseModal :title @close="$emit('close')">
        <form @submit.prevent="$emit('submit')">
            <div class="flex flex-col gap-2">
                <slot />
            </div>

            <div class="mt-4 flex justify-end">
                <input
                    class="w-32 bg-[#222] px-2 py-1 transition-colors hover:bg-[#444] active:bg-[#111]"
                    type="submit"
                    :value="i18n.modals.form.confirm"
                />
            </div>
        </form>
    </BaseModal>
</template>
