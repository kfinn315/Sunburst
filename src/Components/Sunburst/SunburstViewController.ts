import { HierarchyRectangularNode, select } from 'd3'
import { MutableRefObject } from 'react'

import { SunburstEvent } from './Types'
import { ArcProvider } from '../../Services/Arcs';

export interface SunburstViewControllerProps<TNode> {
  arcs: ArcProvider
  duration: number
  getArcColor: (d: HierarchyRectangularNode<TNode>) => string
  getMouseArcPathClass: (d: HierarchyRectangularNode<TNode>) => string | null
  getNodeID: (d: HierarchyRectangularNode<TNode>) => number
  onClick: SunburstEvent<TNode>
  onMouseEnter: SunburstEvent<TNode>
  onMouseLeave: SunburstEvent<TNode>
}

export class SunburstViewController<TNode> {
  constructor(
    private readonly ref: MutableRefObject<SVGGElement | null>,
    private readonly props: SunburstViewControllerProps<TNode>,
  ) { }

  /**
   * Initializes and updates the sunburst chart based on the provided items data
   */
  initialize(items: HierarchyRectangularNode<TNode>[] = []): void {
    const {
      arcs,
      duration,
      getArcColor,
      getMouseArcPathClass,
      getNodeID,
      onClick,
      onMouseEnter,
      onMouseLeave,
    } = this.props

    if (!this.ref.current) {
      return
    }

    const baseSelection = select<SVGGElement, HierarchyRectangularNode<TNode>>(
      this.ref.current,
    )

    const createArcs = () => {
      let arcGroupSelection = baseSelection.select<SVGGElement>('.arc')

      if (arcGroupSelection == null || arcGroupSelection.size() === 0) {
        arcGroupSelection = baseSelection.append('g').attr('class', 'arc')
      }

      const arcSelection = arcGroupSelection
        .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
        .data(items, getNodeID)

      const arcsEnter = arcSelection.enter().append('path')

      arcsEnter
        .merge(arcSelection)
        .transition()
        .duration(duration)
        .attr('fill', getArcColor)
        .attr('d', arcs.getPaddedArc())
        .attr('data-id', getNodeID)

      arcSelection.exit().remove()
    }

    /**
     * Duplicate the arc svg element to handle mouse pointer interactions
     */
    const createMouseArcs = () => {

      let mouseGroup = baseSelection
        .select<SVGGElement>('.mousearc');

      if (mouseGroup == null || mouseGroup.size() === 0) {
        mouseGroup = baseSelection.append('g').attr('class', 'mousearc')
      }

      mouseGroup.attr('fill', 'none')
        .attr('pointer-events', 'all')

      const mouseArcSelection = mouseGroup
        .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
        .data(items, getNodeID)

      const mouseArcsEnter = mouseArcSelection
        .enter()
        .append('path')
        .attr('class', getMouseArcPathClass)
        .attr('data-id', getNodeID)

      mouseArcsEnter
        .on('mouseenter', (ev: MouseEvent, d) => {
          onMouseEnter(ev, d)
        })
        .on('mouseout', (ev: MouseEvent, d) => {
          onMouseLeave(ev, d)
        })
        .on('click', (ev: MouseEvent, d) => {
          onClick(ev, d)
        })
        .merge(mouseArcSelection)
        .transition()
        .duration(duration)
        .attr('d', arcs.getArc())

      //animate removal - arc radius becomes zero
      mouseArcSelection
        .exit<HierarchyRectangularNode<TNode>>()
        .transition()
        .duration(duration)
        .attr('d', arcs.getZeroArc())
        .remove()
    }

    createArcs()

    createMouseArcs()
  }
}
