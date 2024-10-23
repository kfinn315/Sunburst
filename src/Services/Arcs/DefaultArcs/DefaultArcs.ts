import { Arc } from "d3";
import { ArcCoordinates, Arcs } from "../Types";
import { getArc } from "./getArc";
import { getPaddedArc } from "./getPaddedArc";
import { zeroArc } from "./zeroArc";

/**
 *
 * Uses the d3.arc() method to create 3 Arc generators (standard, padded, zero) for the specific radius
 * @export
 * @class DefaultArcs
 * @implements {Arcs}
 */
export default class DefaultArcs implements Arcs {
  standard: Arc<unknown, ArcCoordinates>;
  padded: Arc<unknown, ArcCoordinates>;
  zero: Arc<unknown, ArcCoordinates> = zeroArc;

  constructor(radius: number) {
    this.zero = zeroArc;
    this.padded = getPaddedArc(radius);
    this.standard = getArc(radius);
  }
}
