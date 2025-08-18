import { EaseType } from "../chart"

const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * Math.PI) / 3;
const c5 = (2 * Math.PI) / 4.5;
const n1 = 7.5625;
const d1 = 2.75;

export const easeValue = (x: number, ease: EaseType) => {
    switch (ease) {
        case EaseType.IN_SINE:
            return 1 - Math.cos((x * Math.PI) / 2)
        case EaseType.OUT_SINE:
            return Math.sin((x * Math.PI) / 2)
        case EaseType.IN_OUT_SINE:
            return -(Math.cos(Math.PI * x) - 1) / 2
        case EaseType.OUT_IN_SINE:
            return x < 0.5 ? Math.sin(x * Math.PI) / 2 : 1 - 0.5 * Math.cos((x - 0.5) * Math.PI)
        case EaseType.IN_QUAD:
            return x * x
        case EaseType.OUT_QUAD:
            return 1 - (1 - x) * (1 - x)
        case EaseType.IN_OUT_QUAD:
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
        case EaseType.OUT_IN_QUAD:
            return x < 0.5 ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1)
        case EaseType.IN_CUBIC:
            return x * x * x
        case EaseType.OUT_CUBIC:
            return 1 - Math.pow(1 - x, 3)
        case EaseType.IN_OUT_CUBIC:
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
        case EaseType.OUT_IN_CUBIC:
            return x < 0.5
                ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x)
                : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1)
        case EaseType.IN_QUART:
            return x * x * x * x
        case EaseType.OUT_QUART:
            return 1 - Math.pow(1 - x, 4)
        case EaseType.IN_OUT_QUART:
            return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
        case EaseType.OUT_IN_QUART:
            return x < 0.5
                ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x)
                : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) * (2 * x - 1)
        case EaseType.IN_QUINT:
            return x * x * x * x * x
        case EaseType.OUT_QUINT:
            return 1 - Math.pow(1 - x, 5)
        case EaseType.IN_OUT_QUINT:
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
        case EaseType.OUT_IN_QUINT:
            return x < 0.5
                ? 0.5 - 0.5 * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x) * (1 - 2 * x)
                : 0.5 + 0.5 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) * (2 * x - 1)
        case EaseType.IN_EXPO:
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
        case EaseType.OUT_EXPO:
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
        case EaseType.IN_OUT_EXPO:
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                        : (2 - Math.pow(2, -20 * x + 10)) / 2
        case EaseType.OUT_IN_EXPO:
            return x == 0
                ? 0
                : x == 1
                    ? 1
                    : x < 0.5
                        ? 0.5 - 0.5 * Math.pow(2, -20 * x)
                        : 0.5 + 0.5 * Math.pow(2, 20 * x - 20)
        case EaseType.IN_CIRC:
            return 1 - Math.sqrt(1 - Math.pow(x, 2))
        case EaseType.OUT_CIRC:
            return Math.sqrt(1 - Math.pow(x - 1, 2))
        case EaseType.IN_OUT_CIRC:
            return x < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
        case EaseType.OUT_IN_CIRC:
            return x < 0.5
                ? 0.5 * Math.sqrt(1 - (2 * x - 1) * (2 * x - 1))
                : 1 - 0.5 * Math.sqrt(1 - (2 * x - 1) * (2 * x - 1))
        case EaseType.IN_BACK:
            return c3 * x * x * x - c1 * x * x;
        case EaseType.OUT_BACK:
            return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        case EaseType.IN_OUT_BACK:
            return x < 0.5
                ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
        case EaseType.OUT_IN_BACK:
            return x < 0.5
                ? 0.5 +
                0.5 * 2.70158 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) +
                0.5 * 1.70158 * (2 * x - 1) * (2 * x - 1)
                : 0.5 +
                0.5 * 2.70158 * (2 * x - 1) * (2 * x - 1) * (2 * x - 1) -
                0.5 * 1.70158 * (2 * x - 1) * (2 * x - 1)
        case EaseType.IN_ELASTIC:
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
        case EaseType.OUT_ELASTIC:
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        case EaseType.IN_OUT_ELASTIC:
            return x === 0
                ? 0
                : x === 1
                    ? 1
                    : x < 0.5
                        ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                        : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
        case EaseType.OUT_IN_ELASTIC:
            return x == 0
                ? 0
                : x == 1
                    ? 1
                    : x < 0.5
                        ? 0.5 * Math.pow(2, -20 * x) * Math.sin(((x * 20 - 0.75) * 2 * Math.PI) / 3) + 0.5
                        : 0.5 -
                        0.5 *
                        Math.pow(2, 10 * (2 * x - 1) - 10) *
                        Math.sin((((2 * x - 1) * 10 - 10.75) * 2 * Math.PI) / 3)
        case EaseType.ZERO:
            return 0
        case EaseType.ONE:
            return 1
        default:
            return x
    }
}

export const easeCurve = (sMin: number, sMax: number, ease: Ease) => {
    switch (ease) {
        case 'in':
            return sMin * sMax
        case 'out':
            return 1 - (1 - sMin) * (1 - sMax)
        case 'linear':
            return (sMin + sMax) / 2
    }
}
