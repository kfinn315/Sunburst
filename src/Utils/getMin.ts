import { min } from "d3";

export function getMin(array: number[], minValue: number): number {
  return min([...array, minValue]) as number
}
