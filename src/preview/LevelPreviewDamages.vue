<script setup lang="ts">
import { computed } from 'vue'
import { view } from '../editor/view'
import { bpms } from '../history/bpms'
import { cullEntities } from '../history/store'
import { beatToTime, timeToBeat } from '../state/integrals/bpms'
import { unlerp, lerp, remap } from '../utils/math'
import { judgeRotate, judgeResize, judgeMoveX, judgeMoveY, spawnRotate, spawnResize, spawnMoveX, spawnMoveY, transparent, noteH } from './events'
import { Quad } from "./Quad"
import { Vec } from "./Vec"
import { getStageLayout } from "./stage"
import { beatToKey } from '../state/store/grid'
import { settings } from '../settings'

const beats = computed(() => ({
    min: timeToBeat(bpms.value, Math.max(0, view.cursorTime - 0.025 - settings.previewDamageWarning / 1000)),
    max: timeToBeat(bpms.value, view.cursorTime + 0.025),
}))

const keys = computed(() => ({
    min: beatToKey(beats.value.min),
    max: beatToKey(beats.value.max),
}))

function buildInfiniteLine(px: number, py: number, angle: number, thickness: number) {
  const halfW = 16 / 9;
  const halfH = 1;

  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  let tMin = Infinity;
  let tMax = -Infinity;

  function checkT(t: number) {
    const x = px + t * dx;
    const y = py + t * dy;

    if (
      x >= -halfW - 1e-6 &&
      x <=  halfW + 1e-6 &&
      y >= -halfH - 1e-6 &&
      y <=  halfH + 1e-6
    ) {
      if (t < tMin) tMin = t;
      if (t > tMax) tMax = t;
    }
  }

  if (dx !== 0) {
    checkT((-halfW - px) / dx);
    checkT(( halfW - px) / dx);
  }

  if (dy !== 0) {
    checkT((-halfH - py) / dy);
    checkT(( halfH - py) / dy);
  }

  const p1 = {
    x: px + tMin * dx,
    y: py + tMin * dy
  };

  const p2 = {
    x: px + tMax * dx,
    y: py + tMax * dy
  };

  // === extrude jadi quad ===

  const lx = p2.x - p1.x;
  const ly = p2.y - p1.y;
  const len = Math.hypot(lx, ly);

  const nx = -ly / len;
  const ny = lx / len;

  const hx = nx * thickness / 2;
  const hy = ny * thickness / 2;

  return new Quad(
    new Vec(p1.x + hx, p1.y + hy),
    new Vec(p2.x + hx, p2.y + hy),
    new Vec(p2.x - hx, p2.y - hy),
    new Vec(p1.x - hx, p1.y - hy)
  );
}

const damages = computed(() =>
    [...cullEntities('note', keys.value.min, keys.value.max)]
        .filter(({ noteType }) => noteType === 'damage')
        .filter(({ beat }) => beat >= beats.value.min && beat < beats.value.max)
        .sort((a, b) => b.beat - a.beat)
        .map(({ noteType, beat, lane, size, stage }) => {
//        const slideNotes = store.value.slides.note.get(slideId)

/*        if (slideNotes.length > 1 && flickDirection === 'none') color = "#0f0"*/

//        const isTick = !(slideNotes && slideNotes[0] && slideNotes[0].lane === lane && slideNotes[0].beat === beat && slideNotes[0].stage === stage)
        
//        if (isTick) return undefined

//        const fill = noteType === "default" ? (slideNotes && slideNotes.length > 1) ? "#00f" : "#0ff" : noteType === "drag" ? "#0f0" : noteType === "flick" ? "#f0f" : "#f00"

            const targetTime = beatToTime(bpms.value, beat)
        const time = view.cursorTime

        const fill = time > targetTime - 0.025 ? `#ff000077` : `rgba(255, 255, 0, ${ unlerp(targetTime - 0.025 - settings.previewDamageWarning, targetTime - 0.025, time ) / 4 })`
            //const z = unlerp(targetTime - noteDuration.value, targetTime, scaledTimes.value.min)

        const judgeSize = judgeResize(stage).value
        const judgeAngle = judgeRotate(stage).value / 180 * Math.PI

//        const spawnSize = spawnResize(stage).value
//        const spawnTime = targetTime - noteDuration.value

//        const nh = ["drag", "damage"].includes(noteType) ? 0.5 : 1

//        const s = approach(spawnTime, targetTime, spawnSize, judgeSize, scaledTimes(stage).value.min)
//        const h = noteH(stage).value * (1 / remap(spawnTime, targetTime, 1 / (spawnSize / judgeSize), 1, scaledTimes(stage).value.min)) * nh / 2

//        if (s < 0) return undefined
        // debug.log(s)
        // debug.log(h)
        // const rotate = this.stageSharedMemory.angle + (PI * 2 / this.stageImport.type * floor(this.import.lane))
        // let cx = this.stageSharedMemory.bottomPosX - this.stageSharedMemory.size * s / 2 * sin(-rotate) + ((this.import.lane % 1) - 0.5) * this.stageSharedMemory.size * tan(PI / this.stageImport.type) * s * cos(rotate)
        // let cy = this.stageSharedMemory.bottomPosY - this.stageSharedMemory.size * s / 2 * cos(rotate) - ((this.import.lane % 1) - 0.5) * this.stageSharedMemory.size * tan(PI / this.stageImport.type) * s * sin(-rotate)

        const sl = getStageLayout(stage).value


    const px = lerp(sl.p1.x, sl.p4.x, lane)
    const py = lerp(sl.p1.y, sl.p4.y, lane)
        const thickness = judgeSize * size
        const angle = judgeAngle + Math.PI / 2

        const layout = buildInfiniteLine(px, py, angle, thickness)

        /*const x = {
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
        )*/


        return {
            points: layout.toPoints(),
            fill,
        }
    }).filter(n => !!n),
)
</script>

<template>
    <g stroke="white" stroke-width="0">
        <polygon v-for="(polygon, index) in damages" :key="index" v-bind="polygon" />
    </g>
</template>
