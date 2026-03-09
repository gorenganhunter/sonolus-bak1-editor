<script setup lang="ts">
import { computed } from 'vue'
import { bpms } from '../../../history/bpms'
import { store } from '../../../history/store'
import type { NoteEntity } from '../../../state/entities/slides/note'
import { beatToTime } from '../../../state/integrals/bpms'
import { viewBox, view } from '../../view'
import { lerp } from "../../../utils/math"
import LevelEditorTapNote from "./LevelEditorTapNote.vue"
import LevelEditorDragNote from "./LevelEditorDragNote.vue"
import LevelEditorFlickNote from "./LevelEditorFlickNote.vue"
import LevelEditorHoldNote from "./LevelEditorHoldNote.vue"
import LevelEditorDamageNote from "./LevelEditorDamageNote.vue"
import { fakeMarkerComponent } from "./fakeMarker"

const entity = defineProps<NoteEntity>()

const time = computed(() => beatToTime(bpms.value, entity.beat))

const infos = computed(() => store.value.slides.info.get(entity.slideId))

const type = computed(() => {
//    const entity = props

//    if (entity.noteType === 'anchor') return 'anchor'

    // if (entity.noteType === 'damage') return 'damage'
    //
    // if (entity.noteType === 'trace') return 'trace'
    //
    // if (entity.noteType === 'forceTick') return 'tick'
//    if (entity.flickDirection !== "none") return 'single'

    const infoEntity = entity.useInfoOf ?? entity
//    //console.log("b", store.value.slides.note.get(entity.slideId)?.find(n => n === infoEntity))
    if (infoEntity.noteType === 'drag') return 'drag'
    if (infoEntity.noteType === 'flick') return 'flick'
    if (infoEntity.noteType === 'damage') return 'damage'

    if (!infos.value || infos.value.length < 2) return 'tap'
    
    if (infos.value[0]!.note.beat === infoEntity.beat) return 'hold'

    return 'tick'

////console.log(infos.value)
/*    const info = infos.value.find((info) => info.note === infoEntity)
//    //console.log(infoEntity,info)
    if (info) {
        // //console.log(entity, info)
//        if (info.segmentHead === info.segmentTail) return 'single'

        if (info.attachHead === infoEntity) return 'hold'
        //
        // if (info.segmentTail === infoEntity) return 'tail'

        return 'tick'

//        return 'single'
    }

    return 'tap'
//    if (!infos.value.length) return 'single'

/*    let isActive = true
    let i = 0
    // for (; i < infos.value.length; i++) {
    //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //     const { note } = infos.value[i]!
    //
    //     if (entity.beat < note.beat) break
    //
    //     if (i === 0/* || note.isConnectorSeparator*/
    //         isActive = note.connectorType === 'active'
    //     }
    // }

/*    if (isActive) {
        // if (!infos.value[i]) return 'tick'
        //
        // if (entity.isConnectorSeparator && entity.connectorType === 'guide') return 'tail'

        return 'tick'
    } else if (!infos.value[i - 1]) {
        // if (entity.connectorType === 'guide') return 'single'

        return 'head'
    } else {
        if (!infos.value[i]) return 'single'

/*        if (entity.isConnectorSeparator && entity.connectorType === 'active')*/ 

        
})

const noteComponents = {
    tap: LevelEditorTapNote,
    drag: LevelEditorDragNote,
    flick: LevelEditorFlickNote,
    hold: LevelEditorHoldNote,
    tick: LevelEditorHoldNote,
    damage: LevelEditorDamageNote
}
</script>

<template>
    <g :transform="`translate(${lerp(-4, 4, lane - size / 2)}, ${beatToTime(bpms, beat) * viewBox.ups - 0.25})`">
        <component v-if="type !== 'tick'" :is="noteComponents[type]" v-bind="entity" />
    <component :is="fakeMarkerComponent" v-if="entity.isFake" :size="entity.size" />
        <!--text
            v-if="entity.group && (isHighlighted || isViewRecentlyActive)"
            :x="1"
            y="0.4"
            font-size="0.4"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#0aa"
        >
            #{{ entity.group }}
        </text>
        <text
            v-if="entity.shortenEarlyWindow !== 'none'"
            :x="0.6"
            y="-0.4"
            font-size="0.4"
            text-anchor="start"
            dominant-baseline="middle"
            fill="#b00"
        >
            -{{ entity.shortenEarlyWindow }}
        </text-->
    </g>
</template>
