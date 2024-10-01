<script setup lang="ts">
import { components } from '.'
import { view } from '../view'
</script>

<template>
    <g opacity="0.5">
        <component
            :is="components[entity.type]"
            v-for="entity in view.entities.creating"
            :key="entity as never"
            v-bind="entity"
        />
    </g>
</template>
