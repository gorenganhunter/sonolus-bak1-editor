<script setup lang="ts">
import { computed } from 'vue'
import { beats, keys, scaledTimes } from '.'
import { colors } from '../colors'
import { bpms } from '../history/bpms'
import { store, cullEntities } from '../history/store'
import { timeScales } from '../history/timeScales'
import { beatToTime } from '../state/integrals/bpms'
import { timeToScaledTime } from '../state/integrals/timeScales'
import { unlerp, lerp, remap } from '../utils/math'
import { judgeRotate, judgeResize, judgeMoveX, judgeMoveY, spawnRotate, spawnResize, spawnMoveX, spawnMoveY, transparent, noteH } from './events'
import { getLane } from './lane'
import { noteDuration, approach } from './note'
import { Quad } from "./Quad"
import { Vec } from "./Vec"
import { getStageLayout } from "./stage"

const notes = computed(() =>
    [...cullEntities('note', keys.value.min, keys.value.max)]
        .filter(({ beat, stage }) => beat >= beats(stage).value.min && beat < beats(stage).value.max)
        .sort((a, b) => b.beat - a.beat)
        .map(({ noteType, beat, lane, size, stage, slideId }) => {
        const slideNotes = store.value.slides.note.get(slideId)

/*        if (slideNotes.length > 1 && flickDirection === 'none') color = "#0f0"*/

        const isTick = !(slideNotes && slideNotes[0] && slideNotes[0].lane === lane && slideNotes[0].beat === beat && slideNotes[0].stage === stage)
        
        if (isTick) return undefined

        const fill = noteType === "default" ? (slideNotes && slideNotes.length > 1) ? "#00f" : "#0ff" : noteType === "drag" ? "#0f0" : noteType === "flick" ? "#f0f" : "#f00"

            const targetTime = timeToScaledTime(timeScales.value.filter(t => t.stage === stage), beatToTime(bpms.value, beat))
            //const z = unlerp(targetTime - noteDuration.value, targetTime, scaledTimes.value.min)

        const judgeSize = judgeResize(stage).value
        const spawnSize = spawnResize(stage).value
        const spawnTime = targetTime - noteDuration.value

        const nh = ["drag", "damage"].includes(noteType) ? 0.5 : 1

        const s = approach(spawnTime, targetTime, spawnSize, judgeSize, scaledTimes(stage).value.min)
        const h = noteH(stage).value * (1 / remap(spawnTime, targetTime, 1 / (spawnSize / judgeSize), 1, scaledTimes(stage).value.min)) * nh / 2

        if (s < 0) return undefined
        // debug.log(s)
        // debug.log(h)
        // const rotate = this.stageSharedMemory.angle + (PI * 2 / this.stageImport.type * floor(this.import.lane))
        // let cx = this.stageSharedMemory.bottomPosX - this.stageSharedMemory.size * s / 2 * sin(-rotate) + ((this.import.lane % 1) - 0.5) * this.stageSharedMemory.size * tan(PI / this.stageImport.type) * s * cos(rotate)
        // let cy = this.stageSharedMemory.bottomPosY - this.stageSharedMemory.size * s / 2 * cos(rotate) - ((this.import.lane % 1) - 0.5) * this.stageSharedMemory.size * tan(PI / this.stageImport.type) * s * sin(-rotate)

        const sl = getStageLayout(stage).value

        const x = {
            tl: lerp(sl.p2.x, sl.p3.x, lane - size / 2),
            tr: lerp(sl.p2.x, sl.p3.x, lane + size / 2),
            bl: lerp(sl.p1.x, sl.p4.x, lane - size / 2),
            br: lerp(sl.p1.x, sl.p4.x, lane + size / 2)
        }
        const y = {
            tl: lerp(sl.p2.y, sl.p3.y, lane - size / 2),
            tr: lerp(sl.p2.y, sl.p3.y, lane + size / 2),
            bl: lerp(sl.p1.y, sl.p4.y, lane - size / 2),
            br: lerp(sl.p1.y, sl.p4.y, lane + size / 2)
        }

        const layout = new Quad(
            new Vec(
                lerp(x.tl, x.bl, s + h),
                lerp(y.tl, y.bl, s + h)
            ),
            new Vec(
                lerp(x.tl, x.bl, s - h),
                lerp(y.tl, y.bl, s - h)
            ),
            new Vec(
                lerp(x.tr, x.br, s - h),
                lerp(y.tr, y.br, s - h)
            ),
            new Vec(
                lerp(x.tr, x.br, s + h),
                lerp(y.tr, y.br, s + h)
            )
        )


        return {
            points: layout.toPoints(),
            fill,
        }
    }).filter(n => !!n),
)
</script>

<template>
    <g stroke="white" stroke-width="0.0075">
        <polygon v-for="(polygon, index) in notes" :key="index" v-bind="polygon" />
    </g>
</template>
