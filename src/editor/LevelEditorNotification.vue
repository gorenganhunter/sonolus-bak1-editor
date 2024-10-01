<script setup lang="ts">
import { notification } from './notification'
</script>

<template>
    <div class="pointer-events-none absolute flex size-full items-center justify-center">
        <div
            v-if="notification"
            :key="notification.id"
            class="notification whitespace-break-spaces px-4 py-2 text-center"
        >
            {{ notification.message() }}
        </div>
    </div>
</template>

<style scoped>
.notification {
    animation-name: fade;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

@keyframes fade {
    0% {
        z-index: 100;
        color: rgb(255 255 255);
        background-color: rgb(0 0 0);
    }

    99% {
        z-index: 100;
    }

    100% {
        color: rgb(255 255 255 / 0.25);
        background-color: rgb(0 0 0 / 0);
    }
}
</style>
