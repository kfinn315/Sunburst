import { Arc, arc } from 'd3'

import { ArcCoordinates } from '../Types'

/**
 * Get Arc generator with set radius and padding
 */
export const getPaddedArc = (radius: number): Arc<unknown, ArcCoordinates> => {

  return arc<unknown, ArcCoordinates>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle(1 / radius)
    .padRadius(radius)
    .innerRadius((d) => Math.sqrt(d.y0))
    .outerRadius((d) => Math.sqrt(d.y1) - 1)
}
