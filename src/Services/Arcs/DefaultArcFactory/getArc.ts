import { Arc, arc } from 'd3'

import { ArcCoordinates } from '../Types'

/**
 * Get Arc with radius
 *
 * Calculates and returns an arc shape with the specified radius.
 * The arc is defined by the startAngle, endAngle, innerRadius, and outerRadius.
 *
 * @param radius The radius of the arc.
 * @returns An Arc generator function.
 */

export const getArc = (radius: number): Arc<unknown, ArcCoordinates> =>
  arc<unknown, ArcCoordinates>()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .innerRadius((d) => Math.sqrt(d.y0))
    .outerRadius(radius)
