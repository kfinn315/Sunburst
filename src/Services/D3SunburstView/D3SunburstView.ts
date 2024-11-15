import { HierarchyRectangularNode, select } from 'd3'
import { MutableRefObject } from 'react'

import { Arcs } from '../Arcs';
import { createArcs } from './createArcs';
import { getChildSelection } from './getChildSelection';
import { SunburstEvent } from '../../Types';

export interface D3SunburstViewProps<TNode> {
  arcs: Arcs
  getColor: (d: HierarchyRectangularNode<TNode>) => string
  getID: (d: HierarchyRectangularNode<TNode>) => number
  getLabel?: (d: HierarchyRectangularNode<TNode>) => string
  onClick: SunburstEvent<TNode>
  onMouseEnter: SunburstEvent<TNode>
  onMouseLeave: SunburstEvent<TNode>
  transitionDuration: number
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
      getColor,
      getID,
      onClick,
      onMouseEnter,
      onMouseLeave,
      getLabel,
    } = props

    if (this.ref.current) {
      const baseSelection = select<SVGGElement, HierarchyRectangularNode<TNode>>(this.ref.current)
      const selection = getChildSelection<SVGGElement>(baseSelection, 'arcs');
      createArcs<TNode>({
        arcs,
        getColor,
        getID,
        getLabel,
        items,
        onClick,
        onMouseEnter,
        onMouseLeave,
        selection,
        transitionDuration
      })
    }
  }
}
