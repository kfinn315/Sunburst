import { HierarchyRectangularNode, select } from 'd3'
import { MutableRefObject } from 'react'

import { SunburstEvent } from './Types'
import { Arcs } from '../Arcs';
import { createArcs } from './createArcs';
import { createMouseArcs } from './createMouseArcs';

export interface D3SunburstViewProps<TNode> {
  arcs: Arcs
  transitionDuration: number
  getArcColor: (d: HierarchyRectangularNode<TNode>) => string
  getMouseArcPathClass: (d: HierarchyRectangularNode<TNode>) => string | null
  getNodeID: (d: HierarchyRectangularNode<TNode>) => number
  onClick: SunburstEvent<TNode>
  onMouseEnter: SunburstEvent<TNode>
  onMouseLeave: SunburstEvent<TNode>
}

export class D3SunburstView<TNode> {
  constructor(
    private readonly ref: MutableRefObject<SVGGElement | null>,
    private readonly props: D3SunburstViewProps<TNode>,
  ) { }

  /**
   * Initializes and updates the sunburst chart based on the provided items data
   */
  layout(items: HierarchyRectangularNode<TNode>[] = []): void {
    const {
      arcs,
      transitionDuration,
      getArcColor,
      getMouseArcPathClass,
      getNodeID,
      onClick,
      onMouseEnter,
      onMouseLeave,
    } = this.props

    if (this.ref.current) {
      const baseSelection = select<SVGGElement, HierarchyRectangularNode<TNode>>(this.ref.current)

      createArcs<TNode>({ arcs, baseSelection, getArcColor, getNodeID, items, transitionDuration, })
      createMouseArcs<TNode>({ arcs, baseSelection, getPathClass: getMouseArcPathClass, getNodeID, items, onClick, onMouseEnter, onMouseLeave, transitionDuration, })
    }
  }
}

export function d3SunburstView<TNode>(
  ref: MutableRefObject<SVGGElement | null>,
  items: HierarchyRectangularNode<TNode>[],
  props: D3SunburstViewProps<TNode>,
) {

  if (ref.current) {
    const {
      arcs,
      transitionDuration,
      getArcColor,
      getMouseArcPathClass,
      getNodeID,
      onClick,
      onMouseEnter,
      onMouseLeave,
    } = props

    const baseSelection = select<SVGGElement, HierarchyRectangularNode<TNode>>(ref.current)

    createArcs<TNode>({ arcs, baseSelection, getArcColor, getNodeID, items, transitionDuration, })
    createMouseArcs<TNode>({ arcs, baseSelection, getPathClass: getMouseArcPathClass, getNodeID, items, onClick, onMouseEnter, onMouseLeave, transitionDuration, })
  }
}
