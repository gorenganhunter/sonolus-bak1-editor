<script setup lang="ts">
import type { DefaultNoteSlideProperties } from '../../../../settings'
import { bodyComponents } from './body'
import { slideConnectorComponent } from './slideConnector'
import { fakeMarkerComponent } from './fakeMarker'

defineProps<{
    properties: DefaultNoteSlideProperties
}>()
</script>

<template>
    <component :is="slideConnectorComponent" :properties />
    <component :is="bodyComponents.none" />
    <component :is="fakeMarkerComponent" v-if="properties.isFake" />
</template>
