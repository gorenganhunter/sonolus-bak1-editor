<script setup lang="ts">
import { computed } from 'vue'
import { beats, keys, scaledTimes } from '.'
import { colors } from '../colors'
import { bpms } from '../history/bpms'
import { cullEntities } from '../history/store'
import { timeScales } from '../history/timeScales'
import { beatToTime } from '../state/integrals/bpms'
import { timeToScaledTime } from '../state/integrals/timeScales'
import { unlerp } from '../utils/math'
import { rotate, resize, moveX, moveY } from './events'
import { getLane } from './lane'
import { noteDuration, approach } from './note'
import { Quad } from "./Quad"
import { Vec } from "./Vec"

const holdNotes = computed(() =>
    [...cullEntities('holdNote', 0, keys.value.max)]
        .filter(({ beat, duration, stage }) => beat + duration >= beats(stage).value.min && beat < beats(stage).value.max)
        .sort((a, b) => b.beat - a.beat)
        .map(({ beat, lane, size, stage, duration }) => {
        let layout = new Quad(
            {x: -size * (1 + 0.08 * Math.abs((lane % 1) - 0.5 - size / 2)),
            y: -0.02},
            {x: -size * (1 - 0.08 * Math.abs((lane % 1) - 0.5 - size / 2)),
            y: 0.02},
            {x: size * (1 - 0.08 * Math.abs((lane % 1) - 0.5 + size / 2)),
            y: 0.02},
            {x: size * (1 + 0.08 * Math.abs((lane % 1) - 0.5 + size / 2)),
                y: -0.02}
        )

            const targetTime = timeToScaledTime(timeScales.value.filter(t => t.stage === stage), beatToTime(bpms.value, beat))
            //const z = unlerp(targetTime - noteDuration.value, targetTime, scaledTimes(stage).value.min)

        const opacity = targetTime >= scaledTimes(stage).value.min ? 1 : 0

        const s = approach(targetTime - noteDuration.value, targetTime, scaledTimes(stage).value.min)

        const angle = (rotate(stage).value % 360) / 180 * Math.PI
        const size2 = resize(stage).value
        const posX = moveX(stage).value
        const posY = moveY(stage).value

        // console.log(s, angle, size2, posX, posY)

        const rotate2 = angle + (Math.PI / 2 * Math.floor(lane))
        let cx = posX - size2 * s / 2 * Math.sin(-rotate2) + ((lane % 1) - 0.5) * size2 * s * Math.cos(rotate2)
        let cy = posY - size2 * s / 2 * Math.cos(rotate2) - ((lane % 1) - 0.5) * size2 * s * Math.sin(-rotate2)

        // console.log(rotate2, cx, cy)

        const points = layout.mul(size2 / 2 * s).rotate(rotate2).translate(cx, cy).toPoints()
        
        const visibleTime = {
            min: Math.max(targetTime, scaledTimes(stage).value.min),
            max: Math.min(timeToScaledTime(timeScales.value.filter(t => t.stage === stage), beatToTime(bpms.value, beat + duration)), scaledTimes(stage).value.max),
        }

        const s2 = {
            min: approach(visibleTime.min - noteDuration.value, visibleTime.min, scaledTimes(stage).value.min),
            max: approach(visibleTime.max - noteDuration.value, visibleTime.max, scaledTimes(stage).value.min),
        }

        // const rotate = this.stageSharedMemory.angle + (Math.PI / 2 * Math.floor(this.import.lane))

        let minL = new Vec({
            x: posX - size2 * s2.min / 2 * Math.sin(-rotate2) + ((lane % 1) - 0.5 - size * 0.8 / 2) * size2 * s2.min * Math.cos(rotate2),
            y: posY - size2 * s2.min / 2 * Math.cos(rotate2) - ((lane % 1) - 0.5 - size * 0.8 / 2) * size2 * s2.min * Math.sin(-rotate2)
        })

        let minR = new Vec({
            x: posX - size2 * s2.min / 2 * Math.sin(-rotate2) + ((lane % 1) - 0.5 + size * 0.8 / 2) * size2 * s2.min * Math.cos(rotate2),
            y: posY - size2 * s2.min / 2 * Math.cos(rotate2) - ((lane % 1) - 0.5 + size * 0.8 / 2) * size2 * s2.min * Math.sin(-rotate2)
        })

        let maxL = new Vec({
            x: posX - size2 * s2.max / 2 * Math.sin(-rotate2) + ((lane % 1) - 0.5 - size * 0.8 / 2) * size2 * s2.max * Math.cos(rotate2),
            y: posY - size2 * s2.max / 2 * Math.cos(rotate2) - ((lane % 1) - 0.5 - size * 0.8 / 2) * size2 * s2.max * Math.sin(-rotate2)
        })

        let maxR = new Vec({
            x: posX - size2 * s2.max / 2 * Math.sin(-rotate2) + ((lane % 1) - 0.5 + size * 0.8 / 2) * size2 * s2.max * Math.cos(rotate2),
            y: posY - size2 * s2.max / 2 * Math.cos(rotate2) - ((lane % 1) - 0.5 + size * 0.8 / 2) * size2 * s2.max * Math.sin(-rotate2)
        })

        const connector = {
            points: new Quad(
                minL,
                maxL,
                maxR,
                minR
            ).toPoints(),
            fill: "rgba(0, 0, 255, 0.75)"
        }

            const note = {
                points,
                fill: "#00f",
                opacity
            }

//        console.log(note, connector)

        return {
            note, connector
        }
        }),
)
</script>

<template>
        <template v-for="({ note, connector }, index) in holdNotes" :key="index">
            <polygon v-bind="note" />
            <polygon v-bind="connector" />
        </template>
</template>
