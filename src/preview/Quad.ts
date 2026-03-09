import { Vec, type VecLike } from "./Vec"

export type QuadLike = {
  p1: VecLike,
  p2: VecLike,
  p3: VecLike,
  p4: VecLike
}

export class Quad {
  constructor(
    public p1: VecLike = { x: -1, y: -1 },
    public p2: VecLike = { x: -1, y: 1 },
    public p3: VecLike = { x: 1, y: 1 },
    public p4: VecLike = { x: 1, y: -1 }
  ) { }

  mul(value: number): Quad {
    return new Quad(new Vec(this.p1).mul(value), new Vec(this.p2).mul(value), new Vec(this.p3).mul(value), new Vec(this.p4).mul(value))
  }

  add(x: number, y: number): Quad {
    return new Quad(new Vec(this.p1).add(x, y), new Vec(this.p2).add(x, y), new Vec(this.p3).add(x, y), new Vec(this.p4).add(x, y))
  }

  rotate(angle: number): Quad {
    return new Quad(new Vec(this.p1).rotate(angle), new Vec(this.p2).rotate(angle), new Vec(this.p3).rotate(angle), new Vec(this.p4).rotate(angle))
  }

  toPoints(): string {
    return `${this.p1.x} ${this.p1.y} ${this.p2.x} ${this.p2.y} ${this.p3.x} ${this.p3.y} ${this.p4.x} ${this.p4.y}`
  }
}
