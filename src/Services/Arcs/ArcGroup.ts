import { Arc } from 'd3'

import { getArc } from './getArc'
import { getPaddedArc } from './getPaddedArc'
import { ArcCoordinates, Arcs } from './Types'
import { zeroArc } from './zeroArc'

export default class ArcGroup implements Arcs {
  public readonly padded: Arc<unknown, ArcCoordinates>
  public readonly basic: Arc<unknown, ArcCoordinates>
  public readonly zero: Arc<unknown, ArcCoordinates>
  constructor(radius: number) {
    this.padded = getPaddedArc(radius)
    this.basic = getArc(radius)
    this.zero = zeroArc
  }
}
