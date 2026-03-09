<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../history/bpms'
import type { ConnectorEntity } from '../../../state/entities/slides/connector'
import { beatToTime } from '../../../state/integrals/bpms'
import { remap } from '../../../utils/math'
import { ups } from '../../view'

const props = defineProps<{
    entity: ConnectorEntity
}>()

const box = computed(() => {
    const { head, tail } = props.entity

    // const tAttachHead = beatToTime(bpms.value, attachHead.beat)
    // const tAttachTail = beatToTime(bpms.value, attachTail.beat)

    const tHead = beatToTime(bpms.value, head.beat)
    const tTail = beatToTime(bpms.value, tail.beat)

    // const lHead = remap(tAttachHead, tAttachTail, attachHead.lane, attachTail.lane, tHead)
    // const lTail = remap(tAttachHead, tAttachTail, attachHead.lane, attachTail.lane, tTail)

    return {
        xHead: head.lane,
        yHead: tHead * ups.value,

        xTail: tail.lane,
        yTail: tTail * ups.value,
    }
})
</script>

<template>
    <g
        v-if="
            entity.head.isFake
        "
        stroke="#f44"
        stroke-opacity="0.8"
    >
        <line :x1="box.xHead - 0.5" :y1="box.yHead" :x2="box.xTail + 0.5" :y2="box.yTail" />
        <line :x1="box.xTail - 0.5" :y1="box.yTail" :x2="box.xHead + 0.5" :y2="box.yHead" />
    </g>
</template>
