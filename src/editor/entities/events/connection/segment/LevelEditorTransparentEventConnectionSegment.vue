<script setup lang="ts">
import { computed } from 'vue'
import type { Segment } from '.'
import type { TransparentEventConnectionEntity } from '../../../../../state/entities/events/connections/transparent'
import { transparentEventValueToLane } from '../../../../../state/entities/events/joints/transparent'
import { lerp } from '../../../../../utils/math'
import { easeCurve, easeValue } from '../../../../ease'
import { viewBox } from '../../../../view'

const props = defineProps<{
    entity: TransparentEventConnectionEntity
    segment: Segment
}>()

const sToX = (s: number) => (transparentEventValueToLane(lerp(props.entity.min.value, props.entity.max.value, s)) - 0.5) * 8

const d = computed(() => {
    const { min, max } = props.segment
    const ease = props.entity.min.ease

    const x1 = sToX(easeValue(min.s, ease))
    const x2 = sToX(easeValue(max.s, ease))

    const y1 = min.time * viewBox.value.ups
    const y2 = max.time * viewBox.value.ups

    return ease !== 'linear'
        ? `M ${x1} ${y1} L ${x2} ${y2}`
        : `M ${x1} ${y1} Q ${sToX(easeCurve(min.s, max.s, ease))} ${(y1 + y2) / 2} ${x2} ${y2}`
})
</script>

<template>
    <path :d />
</template>
