import { type ParticleDataGroupParticleProperty } from '@sonolus/core'
import { EaseType } from './chart'

export type Ease = Required<ParticleDataGroupParticleProperty>['ease']

export const easings: Record<EaseType, (x: number) => number> = {
    [EaseType.LINEAR]: (x) => x,
    [EaseType.IN_SINE]: (x) => 1 - Math.cos((x * Math.PI) / 2),
    [EaseType.OUT_SINE]: (x) => Math.sin((x * Math.PI) / 2),
    [EaseType.IN_OUT_SINE]: (x) => -(Math.cos(x * Math.PI) - 1) / 2,
    [EaseType.OUT_IN_SINE]: (x) =>
        x < 0.5 ? Math.sin(x * Math.PI) / 2 : 1 - 0.5 * Math.cos((x - 0.5) * Math.PI),
    [EaseType.IN_QUAD]: (x) => x * x,
    [EaseType.OUT_QUAD]: (x) => 1 - (1 - x) * (1 - x),
    [EaseType.IN_OUT_QUAD]: (x) => (x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) * (-2 * x + 2)) / 2),
    [EaseType.OUT_IN_QUAD]: (x) =>
        x < 0.5 ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1),
    [EaseType.IN_CUBIC]: (x) => x * x * x,
    [EaseType.OUT_CUBIC]: (x) => 1 - (1 - x) * (1 - x) * (1 - x),
    [EaseType.IN_OUT_CUBIC]: (x) =>
        x < 0.5 ? 4 * x * x * x : 1 - ((-2 * x + 2) * (-2 * x + 2) * (-2 * x + 2)) / 2,
    [EaseType.OUT_IN_CUBIC]: (x) =>
        x < 0.5
            ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x)
            : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1),
    [EaseType.IN_QUART]: (x) => x * x * x * x,
    [EaseType.OUT_QUART]: (x) => 1 - (1 - x) * (1 - x) * (1 - x) * (1 - x),
    [EaseType.IN_OUT_QUART]: (x) =>
        x < 0.5
            ? 8 * x * x * x * x
            : 1 - ((-2 * x + 2) * (-2 * x + 2) * (-2 * x + 2) * (-2 * x + 2)) / 2,
    [EaseType.OUT_IN_QUART]: (x) =>
        x < 0.5
            ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x)
            : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) * (2 * x - 1),
    [EaseType.IN_QUINT]: (x) => x * x * x * x * x,
    [EaseType.OUT_QUINT]: (x) => 1 - (1 - x) * (1 - x) * (1 - x) * (1 - x) * (1 - x),
    [EaseType.IN_OUT_QUINT]: (x) =>
        x < 0.5
            ? 16 * x * x * x * x * x
            : 1 - ((-2 * x + 2) * (-2 * x + 2) * (-2 * x + 2) * (-2 * x + 2) * (-2 * x + 2)) / 2,
    [EaseType.OUT_IN_QUINT]: (x) =>
        x < 0.5
            ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x)
            : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) * (2 * x - 1),
    [EaseType.IN_EXPO]: (x) => (x == 0 ? 0 : Math.pow(2, 10 * x - 10)),
    [EaseType.OUT_EXPO]: (x) => (x == 1 ? 1 : 1 - Math.pow(2, -10 * x)),
    [EaseType.IN_OUT_EXPO]: (x) =>
        x == 0
            ? 0
            : x == 1
                ? 1
                : x < 0.5
                    ? 0.5 * Math.pow(2, 20 * x - 10)
                    : 1 - 0.5 * Math.pow(2, -20 * x + 10),
    [EaseType.OUT_IN_EXPO]: (x) =>
        x == 0
            ? 0
            : x == 1
                ? 1
                : x < 0.5
                    ? 0.5 - 0.5 * Math.pow(2, -20 * x)
                    : 0.5 + 0.5 * Math.pow(2, 20 * x - 20),
    [EaseType.IN_CIRC]: (x) => 1 - Math.sqrt(1 - x * x),
    [EaseType.OUT_CIRC]: (x) => Math.sqrt(1 - (x - 1) * (x - 1)),
    [EaseType.IN_OUT_CIRC]: (x) =>
        x < 0.5
            ? 0.5 - 0.5 * Math.sqrt(1 - 4 * x * x)
            : 0.5 + 0.5 * Math.sqrt(1 - (-2 * x + 2) * (-2 * x + 2)),
    [EaseType.OUT_IN_CIRC]: (x) =>
        x < 0.5
            ? 0.5 * Math.sqrt(1 - (2 * x - 1) * (2 * x - 1))
            : 1 - 0.5 * Math.sqrt(1 - (2 * x - 1) * (2 * x - 1)),
    [EaseType.IN_BACK]: (x) => 2.70158 * x * x * x - 1.70158 * x * x,
    [EaseType.OUT_BACK]: (x) => 1 + 2.70158 * (x - 1) * (x - 1) * (x - 1) + 1.70158 * (x - 1) * (x - 1),
    [EaseType.IN_OUT_BACK]: (x) =>
        x < 0.5
            ? 2 * x * x * (7.18982 * x - 2.59491)
            : (x - 1) * (2 * x - 2) * (3.59491 * (x * 2 - 2) + 2.59491) + 1,
    [EaseType.OUT_IN_BACK]: (x) =>
        x < 0.5
            ? 0.5 +
            0.5 * 2.70158 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) +
            0.5 * 1.70158 * (2 * x - 1) * (2 * x - 1)
            : 0.5 +
            0.5 * 2.70158 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) -
            0.5 * 1.70158 * (2 * x - 1) * (2 * x - 1),
    [EaseType.IN_ELASTIC]: (x) =>
        x == 0
            ? 0
            : x == 1
                ? 1
                : -Math.pow(2, 10 * x - 10) * Math.sin(((x * 10 - 10.75) * 2 * Math.PI) / 3),
    [EaseType.OUT_ELASTIC]: (x) =>
        x == 0
            ? 0
            : x == 1
                ? 1
                : Math.pow(2, -10 * x) * Math.sin(((x * 10 - 0.75) * 2 * Math.PI) / 3) + 1,
    [EaseType.IN_OUT_ELASTIC]: (x) =>
        x == 0
            ? 0
            : x == 1
                ? 1
                : x < 0.5
                    ? -(Math.pow(2, 20 * x - 10) * Math.sin(((20 * x - 11.125) * 2 * Math.PI) / 4.5)) /
                    2
                    : (Math.pow(2, -20 * x + 10) * Math.sin(((20 * x - 11.125) * 2 * Math.PI) / 4.5)) /
                    2 +
                    1,
    [EaseType.OUT_IN_ELASTIC]: (x) =>
        x == 0
            ? 0
            : x == 1
                ? 1
                : x < 0.5
                    ? 0.5 * Math.pow(2, -20 * x) * Math.sin(((x * 20 - 0.75) * 2 * Math.PI) / 3) + 0.5
                    : 0.5 -
                    0.5 *
                    Math.pow(2, 10 * (2 * x - 1) - 10) *
                    Math.sin((((2 * x - 1) * 10 - 10.75) * 2 * Math.PI) / 3),
    [EaseType.ZERO]: (x) => 0,
    [EaseType.ONE]: (x) => 1
}

export const ease = (type: EaseType, x: number) => easings[type](x)
