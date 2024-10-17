import ArcProvider from "../ArcProvider";
import { getArc } from "./getArc";
import { getPaddedArc } from "./getPaddedArc";
import { zeroArc } from "./zeroArc";


export default class DefaultArcProvider implements ArcProvider {
  private readonly paddedArc;
  private readonly zeroArc;
  private readonly arc;

  constructor(radius: number) {
    this.paddedArc = getPaddedArc(radius);
    this.zeroArc = zeroArc;
    this.arc = getArc(radius);
  }

  public getPaddedArc() {
    return this.paddedArc;
  }
  public getZeroArc() {
    return this.zeroArc;
  }

  public getArc() {
    return this.arc;
  }

}
