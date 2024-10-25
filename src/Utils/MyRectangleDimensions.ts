import { RectangleDimensions } from "../Types";

export class MyRectangleDimensions implements RectangleDimensions {
  height: number;
  width: number;
  constructor(array: [number, number]) {
    this.width = array[0];
    this.height = array[1];
  }
  toArray() {
    return [this.width, this.height];
  }
}
