import type { ParseChart } from ".";

export const parseChartStages: ParseChart = (chart, entities) => {
  for (const entity of entities) {
    if (entity.archetype !== "BAK1Stage") continue

    const id = parseInt(entity.name?.replace("stage", "")!)
    chart.stages.push({ id })
  }
}
