import { min } from "d3";
import { RectangleDimensions } from "../../Types";

export function getSVGDimensions(dimensions: RectangleDimensions, minWidth: number) {
  return min([dimensions.height, dimensions.width]) ?? minWidth;
}
