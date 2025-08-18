export type VecLike = {
    x: number
    y: number
}

export class Vec {
    public x
    public y

    constructor(x: number | VecLike, y: number = 0) {
        if (typeof x === "number") {
            this.x = x
            this.y = y
        } else {
            this.x = x.x
            this.y = x.y
        }
    }

    mul(value: number): Vec {
        return new Vec(this.x * value, this.y * value)
    }

    translate(x: number, y: number): Vec {
        return new Vec(this.x + x, this.y + y)
    }

    rotate(angle: number): Vec {
        return new Vec(
            Math.cos(angle) * this.x - Math.sin(angle) * this.y,
            Math.sin(angle) * this.x + Math.cos(angle) * this.y,
        )
    }
}
