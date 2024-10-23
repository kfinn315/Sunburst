import { Arc, arc } from 'd3'

import { ArcCoordinates } from '../Types'

/**
 * Arc generator with radius = 0 and angle = 0
 */

export const zeroArc: Arc<unknown, ArcCoordinates> =
  arc<unknown, ArcCoordinates>()
    .startAngle(0)
    .endAngle(0)
    .innerRadius(0)
    .outerRadius(0)
