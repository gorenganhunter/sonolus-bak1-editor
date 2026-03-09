<script setup lang="ts">
import { connectorComponents } from '.'
import type { ConnectorEntity } from '../../../state/entities/slides/connector'

const entity = defineProps<ConnectorEntity>()
</script>

<template>
    <g v-if="entity.tail.beat > entity.head.beat">
        <component :is="connectorComponents['linear']" :entity />
    </g>
</template>
