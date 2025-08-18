import type { Chart } from '.'

export const validateChart = (chart: Chart) => {
    if (!chart.bpms.some(({ beat }) => beat === 0))
        throw new Error('Invalid level: initial BPM not found')

    // if (!chart.timeScales.some(({ beat }) => beat === 0))
    //     throw new Error('Invalid level: initial Time Scale not found')
}
