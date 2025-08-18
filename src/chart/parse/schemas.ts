import { Type } from '@sinclair/typebox'

export const beatSchema = Type.Number({ minimum: 0 })

export const scaleSchema = Type.Number({ minimum: 0 })

export const sizeSchema = Type.Number({ minimum: 0, maximum: 1 })

export const laneSchema = Type.Number({/* minimum: 0, maximum: 4 */ })

export const durationSchema = Type.Number({ minimum: 0 })
