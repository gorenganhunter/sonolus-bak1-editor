export type Chart = {
    bpms: ValueObject[]

    timeScales: StageValueObject[]

    stages: Stage[]

    judgeMoveXEvents: EventObject[]
    judgeMoveYEvents: EventObject[]
    judgeResizeEvents: EventObject[]
    judgeRotateEvents: EventObject[]
    spawnMoveXEvents: EventObject[]
    spawnMoveYEvents: EventObject[]
    spawnResizeEvents: EventObject[]
    spawnRotateEvents: EventObject[]
    transparentEvents: EventObject[]
    noteHEvents: EventObject[]

    slides: NoteObject[][]
}

export type StageObject = {
    stage: number
}

export type ValueObject = {
    beat: number
    value: number
}

export type StageValueObject = ValueObject & StageObject

export type EventObject = StageValueObject & {
    ease: Ease
}

export type Ease = EaseType

export type NoteType = "default" | "drag" | "flick" | "damage"

export type NoteObject = StageObject & {
    noteType: NoteType
    beat: number
    lane: number
    size: number
    isFake: boolean
}

export type Stage = {
    id: number
}

export enum EaseType {
    LINEAR,
    IN_SINE,
    OUT_SINE,
    IN_OUT_SINE,
    OUT_IN_SINE,
    IN_QUAD,
    OUT_QUAD,
    IN_OUT_QUAD,
    OUT_IN_QUAD,
    IN_CUBIC,
    OUT_CUBIC,
    IN_OUT_CUBIC,
    OUT_IN_CUBIC,
    IN_QUART,
    OUT_QUART,
    IN_OUT_QUART,
    OUT_IN_QUART,
    IN_QUINT,
    OUT_QUINT,
    IN_OUT_QUINT,
    OUT_IN_QUINT,
    IN_EXPO,
    OUT_EXPO,
    IN_OUT_EXPO,
    OUT_IN_EXPO,
    IN_CIRC,
    OUT_CIRC,
    IN_OUT_CIRC,
    OUT_IN_CIRC,
    IN_BACK,
    OUT_BACK,
    IN_OUT_BACK,
    OUT_IN_BACK,
    IN_ELASTIC,
    OUT_ELASTIC,
    IN_OUT_ELASTIC,
    OUT_IN_ELASTIC,
    ZERO,
    ONE
}
