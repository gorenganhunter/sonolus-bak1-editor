<script setup lang="ts">
import { computed } from 'vue'
import { beats, keys, scaledTimes } from '.'
// import { colors } from '../colors'
import { bpms } from '../history/bpms'
import { cullEntities } from '../history/store'
import { timeScales } from '../history/timeScales'
import { beatToTime } from '../state/integrals/bpms'
import { timeToScaledTime } from '../state/integrals/timeScales'
import { lerp, unlerp, clamp, remap } from '../utils/math'
import { state } from "../history"
import { judgeResize, spawnResize } from './events'
import { getLane } from './lane'
import { noteDuration, approach } from './note'
import { Vec } from "./Vec"
import { Quad } from "./Quad"
import { getStageLayout } from "./stage"

const connectors = computed(() =>
    [...cullEntities('connector', keys.value.min, keys.value.max)]
        .filter(({ head, tail }) => (tail.beat >= beats(tail.stage).value.min && head.beat < beats(head.stage).value.max))
        .sort((a, b) => b.beat - a.beat)
        .map(({ head, tail }) => {
        const scaledTime = scaledTimes(head.stage).value.min

        const headTime = timeToScaledTime(timeScales.value.filter(t => t.stage === head.stage), beatToTime(bpms.value, head.beat))
        const tailTime = timeToScaledTime(timeScales.value.filter(t => t.stage === tail.stage), beatToTime(bpms.value, tail.beat))

        const visibleTime = {
            min: Math.max(headTime, scaledTime),
            max: Math.min(tailTime, scaledTime + noteDuration.value),
        }

        const judgeSize = judgeResize(head.stage).value
        const spawnSize = spawnResize(tail.stage).value

        const s = {
            min: approach(visibleTime.min - noteDuration.value, visibleTime.min, spawnSize, judgeSize, scaledTime),
            max: approach(visibleTime.max - noteDuration.value, visibleTime.max, spawnSize, judgeSize, scaledTime),
        }

//        if (s.min < 0) return undefined

        const sl = getStageLayout(head.stage).value

        const headL = head.lane - head.size / 2
        const headR = head.lane + head.size / 2
        const tailL = tail.lane - tail.size / 2
        const tailR = tail.lane + tail.size / 2

        let lMin = headL
        let lMax = tailL
        let rMin = headR
        let rMax = tailR

        if (lMin > lMax) [lMin, lMax] = [lMax, lMin]
        if (rMin > rMax) [rMin, rMax] = [rMax, rMin]

        const l = {
            min: clamp(remap(headTime, tailTime, headL, tailL, visibleTime.min), lMin, lMax),
            max: clamp(remap(headTime, tailTime, headL, tailL, visibleTime.max), lMin, lMax),
        }
        const r = {
            min: clamp(remap(headTime, tailTime, headR, tailR, visibleTime.min), rMin, rMax),
            max: clamp(remap(headTime, tailTime, headR, tailR, visibleTime.max), rMin, rMax),
        }
/*
        const x = {
            tl: lerp(sl.p2.x, sl.p3.x, l.max),
            tr: lerp(sl.p2.x, sl.p3.x, r.max),
            bl: lerp(sl.p1.x, sl.p4.x, l.min),
            br: lerp(sl.p1.x, sl.p4.x, r.min)
        }
        const y = {
            tl: lerp(sl.p2.y, sl.p3.y, l.max),
            tr: lerp(sl.p2.y, sl.p3.y, r.max),
            bl: lerp(sl.p1.y, sl.p4.y, l.min),
            br: lerp(sl.p1.y, sl.p4.y, r.min)
        }*/

        const layout = new Quad(
            new Vec(
                lerp(sl.p2.x, sl.p1.x, s.min),
                lerp(sl.p2.y, sl.p1.y, s.min)
            ),
            new Vec(
                lerp(sl.p2.x, sl.p1.x, s.max),
                lerp(sl.p2.y, sl.p1.y, s.max)
            ),
            new Vec(
                lerp(sl.p3.x, sl.p4.x, s.max),
                lerp(sl.p3.y, sl.p4.y, s.max)
            ),
            new Vec(
                lerp(sl.p3.x, sl.p4.x, s.min),
                lerp(sl.p3.y, sl.p4.y, s.min)
            )
        )

        const layout2 = new Quad(
            new Vec(
                lerp(layout.p1.x, layout.p4.x, l.min),
                lerp(layout.p1.y, layout.p4.y, l.min)
            ),
            new Vec(
                lerp(layout.p2.x, layout.p3.x, l.max),
                lerp(layout.p2.y, layout.p3.y, l.max)
            ),
            new Vec(
                lerp(layout.p2.x, layout.p3.x, r.max),
                lerp(layout.p2.y, layout.p3.y, r.max)
            ),
            new Vec(
                lerp(layout.p1.x, layout.p4.x, r.min),
                lerp(layout.p1.y, layout.p4.y, r.min)
            )
        )

        // const layout3 = new Quad(
        //     new Vec(x.bl, y.bl),
        //     new Vec(x.tl, y.tl),
        //     new Vec(x.tr, y.tr),
        //     new Vec(x.br, y.br),
        // )

        return { points: layout2.toPoints(), fill: "#0000ff88" }
        }).filter(c => !!c),
)
</script>

<template>
    <g stroke="white" stroke-width="0">
        <!--polygon v-for="(polygon, index) in tapNotes" :key="index" v-bind="polygon" /-->
        <template v-for="(connector, index) in connectors.flat()" :key="index">
            <polygon v-bind="connector" />
        </template>
    </g>
</template>
