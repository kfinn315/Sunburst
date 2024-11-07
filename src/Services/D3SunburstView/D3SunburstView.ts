import { HierarchyRectangularNode, select } from 'd3'
import { MutableRefObject } from 'react'

import { SunburstEvent } from './Types'
import { Arcs } from '../Arcs';
import { createArcs } from './createArcs';

export interface D3SunburstViewProps<TNode> {
  arcs: Arcs
  transitionDuration: number
  getArcColor: (d: HierarchyRectangularNode<TNode>) => string
  getMouseArcPathClass: (d: HierarchyRectangularNode<TNode>) => string | null
  getNodeID: (d: HierarchyRectangularNode<TNode>) => number
  onClick: SunburstEvent<TNode>
  onMouseEnter: SunburstEvent<TNode>
  onMouseLeave: SunburstEvent<TNode>
  getText?: (d: HierarchyRectangularNode<TNode>) => string
}

export class D3SunburstView<TNode> {
  constructor(
    private readonly ref: MutableRefObject<SVGGElement | null>
  ) { }

  /**
   * Initializes and updates the sunburst chart based on the provided items data
   */
  layout(items: HierarchyRectangularNode<TNode>[] = [], props: D3SunburstViewProps<TNode> = {}): void {
    const {
      arcs,
      transitionDuration,
      getArcColor,
      // getMouseArcPathClass,
      getNodeID,
      onClick,
      onMouseEnter,
      onMouseLeave,
      getText,
    } = props

    if (this.ref.current) {
      const baseSelection = select<SVGGElement, HierarchyRectangularNode<TNode>>(this.ref.current)

      createArcs<TNode>({ arc: arcs.padded, baseSelection, getArcColor, getNodeID, items, transitionDuration, onClick, onMouseEnter, onMouseLeave, getText })
    }
  }
}
