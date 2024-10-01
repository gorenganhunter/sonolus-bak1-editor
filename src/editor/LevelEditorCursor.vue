<script setup lang="ts">
import { view, viewBox } from './view'
</script>

<template>
    <line
        :transform="`translate(0, ${view.cursorTime * viewBox.ups})`"
        :x1="-5"
        :x2="5"
        y1="0"
        y2="0"
        stroke="#fff"
    />
</template>
