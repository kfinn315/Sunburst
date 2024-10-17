import { Arc } from "d3";
import { ArcCoordinates } from "./Types";

export default interface ArcProvider {
  getPaddedArc(): Arc<unknown, ArcCoordinates>;
  getZeroArc(): Arc<unknown, ArcCoordinates>;
  getArc(): Arc<unknown, ArcCoordinates>;
}
