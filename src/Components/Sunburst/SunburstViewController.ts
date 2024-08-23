import { HierarchyRectangularNode, select } from 'd3'
import { MutableRefObject } from 'react'

import { Arcs } from '../../Services/Arcs'
import { SunburstEvent } from './Types'

export interface SunburstViewControllerProps<TNode> {
  arcs: Arcs
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
      arcs: arcCollection,
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

      if (arcGroupSelection == null) {
        arcGroupSelection = baseSelection.append('g').attr('class', 'arc')
      }

      const arcs = arcGroupSelection
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
      let mouseGroup = baseSelection
        .select<SVGGElement>('.mousearc');

      if (mouseGroup == null) {
        mouseGroup = baseSelection.append('g').attr('class', 'mousearc')
      }

      mouseGroup.attr('fill', 'none')
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
