import { HierarchyRectangularNode, select } from 'd3'
import { MutableRefObject } from 'react'

import { Arcs } from '../../Services/Arcs'
import { SunburstEvent } from './Types'

export interface SunburstViewControllerProps<TNode> {
  duration: number
  arcs: Arcs
  onMouseEnter: SunburstEvent<TNode>
  onMouseLeave: SunburstEvent<TNode>
  onClick: SunburstEvent<TNode>
  getArcColor: (d: HierarchyRectangularNode<TNode>) => string
  getMouseArcPathClass: (d: HierarchyRectangularNode<TNode>) => string | null
  getNodeID: (d: HierarchyRectangularNode<TNode>) => number
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
      arcs: arcCollection,
      getMouseArcPathClass,
      onClick,
      duration,
      getArcColor,
      onMouseEnter,
      onMouseLeave,
      getNodeID,
    } = this.props

    if (!this.ref.current) {
      return
    }

    const view = select<SVGGElement, HierarchyRectangularNode<TNode>>(
      this.ref.current,
    )

    const createArcs = () => {
      const arcGroup = view.select('.arc')

      const arcs = arcGroup
        .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
        .data(items, getNodeID)

      const arcsEnter = arcs.enter().append('path')

      arcsEnter
        .merge(arcs)
        .transition()
        .duration(duration)
        .attr('fill', getArcColor)
        .attr('d', arcCollection.padded)
        .attr('data-id', getNodeID)

      arcs.exit().remove()
    }

    const createMouseArcs = () => {
      // Mouse pointer events group //
      const mouseGroup = view
        .select('.mousearc')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')

      const mousearcs = mouseGroup
        .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
        .data(items, getNodeID)

      const mousearcsEnter = mousearcs
        .enter()
        .append('path')
        .attr('class', getMouseArcPathClass)
        .attr('data-id', getNodeID)

      mousearcsEnter
        .on('mouseenter', (ev: MouseEvent, d) => {
          onMouseEnter(ev, d)
        })
        .on('mouseout', (ev: MouseEvent, d) => {
          onMouseLeave(ev, d)
        })
        .on('click', (ev: MouseEvent, d) => {
          onClick(ev, d)
        })
        .merge(mousearcs)
        .transition()
        .duration(duration)
        .attr('d', arcCollection.basic)

      //animate arc removal - arc radii become zero (arcCollection.zero)
      mousearcs
        .exit<HierarchyRectangularNode<TNode>>()
        .transition()
        .duration(duration)
        .attr('d', arcCollection.zero)
        .remove()
    }

    createArcs()

    createMouseArcs()
  }
}
