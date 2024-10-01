<script setup lang="ts">
import { colors } from '../../../../colors'
</script>

<template>
    <svg viewBox="-0.55 -0.55 1.1 1.1">
        <rect x="-0.5" y="-0.5" width="1" height="1" :fill="colors[0]" fill-opacity="0.25" />
        <rect
            x="-0.5"
            y="0.25"
            width="1"
            height="0.25"
            stroke="#fff"
            stroke-width="0.05"
            :fill="colors[0]"
            fill-opacity="0.5"
        />
    </svg>
</template>
