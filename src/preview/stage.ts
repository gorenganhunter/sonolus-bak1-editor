import { judgeRotate, judgeResize, judgeMoveX, judgeMoveY, spawnRotate, spawnResize, spawnMoveX, spawnMoveY, transparent, noteH } from './events'
import { stages } from '../history/stages'
import { Quad } from "./Quad"
import { Vec } from "./Vec"
import { lerp } from '../utils/math'
import { computed } from 'vue'

export const stageLayouts = computed(() => [...stages.value]
  .map(({ id }) => {
    //            const [l, r] = getLane(lane, 1, shift.value, rotate.value)

    //            const targetTime = timeToScaledTime(timeScales.value, beatToTime(bpms.value, beat))
    //            const z = unlerp(targetTime - noteDuration.value, targetTime, scaledTimes.value.min)

    // const points = new Quad().rotate((rotate(id).value % 360) / 180 * Math.PI).mul(resize(id).value / 2).translate(moveX(id).value, moveY(id).value).toPoints()

    const lane = new Quad(
      new Vec(-1, 0).mul(judgeResize(id).value / 2).rotate(judgeRotate(id).value / 180 * Math.PI).add({ x: judgeMoveX(id).value, y: judgeMoveY(id).value }),
      new Vec(-1, 0).mul(spawnResize(id).value / 2).rotate(spawnRotate(id).value / 180 * Math.PI).add({ x: spawnMoveX(id).value, y: spawnMoveY(id).value }),
      new Vec(1, 0).mul(spawnResize(id).value / 2).rotate(spawnRotate(id).value / 180 * Math.PI).add({ x: spawnMoveX(id).value, y: spawnMoveY(id).value }),
      new Vec(1, 0).mul(judgeResize(id).value / 2).rotate(judgeRotate(id).value / 180 * Math.PI).add({ x: judgeMoveX(id).value, y: judgeMoveY(id).value }),
    )

    const judgeline = new Quad(
      new Vec(
        lerp(lane.p2.x, lane.p1.x, 1 + noteH(id).value / 2),
        lerp(lane.p2.y, lane.p1.y, 1 + noteH(id).value / 2)
      ),
      new Vec(
        lerp(lane.p2.x, lane.p1.x, 1 - noteH(id).value / 2),
        lerp(lane.p2.y, lane.p1.y, 1 - noteH(id).value / 2)
      ),
      new Vec(
        lerp(lane.p3.x, lane.p4.x, 1 - noteH(id).value / 2),
        lerp(lane.p3.y, lane.p4.y, 1 - noteH(id).value / 2)
      ),
      new Vec(
        lerp(lane.p3.x, lane.p4.x, 1 + noteH(id).value / 2),
        lerp(lane.p3.y, lane.p4.y, 1 + noteH(id).value / 2)
      ),
    )

    lane.p1 = judgeline.p1
    lane.p4 = judgeline.p4

    return {
      lane,
      judgeline,
      opacity: transparent(id).value
    }
  })
)

export const getStageLayout = (id: number) => computed(() => new Quad(
  new Vec(-1, 0).mul(judgeResize(id).value / 2).rotate(judgeRotate(id).value / 180 * Math.PI).add({ x: judgeMoveX(id).value, y: judgeMoveY(id).value }),
  new Vec(-1, 0).mul(spawnResize(id).value / 2).rotate(spawnRotate(id).value / 180 * Math.PI).add({ x: spawnMoveX(id).value, y: spawnMoveY(id).value }),
  new Vec(1, 0).mul(spawnResize(id).value / 2).rotate(spawnRotate(id).value / 180 * Math.PI).add({ x: spawnMoveX(id).value, y: spawnMoveY(id).value }),
  new Vec(1, 0).mul(judgeResize(id).value / 2).rotate(judgeRotate(id).value / 180 * Math.PI).add({ x: judgeMoveX(id).value, y: judgeMoveY(id).value }),
))
