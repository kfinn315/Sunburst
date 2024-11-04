import { PartitionLayout, partition } from "d3";

export function getCirclePartitionLayout<T>(radius): PartitionLayout<T> {
  return partition<T>().size([2 * Math.PI, radius * radius]);
}
