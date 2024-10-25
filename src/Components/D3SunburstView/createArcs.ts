import { HierarchyRectangularNode, Selection } from "d3";
import { Arcs } from "../../Services/Arcs";
import { getChildSelection } from "./getChildSelection";

interface CreateArcsProps<TNode> {
  arcs: Arcs;
  baseSelection: Selection<SVGGElement, HierarchyRectangularNode<TNode>, null, undefined>;
  getArcColor: (d: HierarchyRectangularNode<TNode>) => string;
  getNodeID: (d: HierarchyRectangularNode<TNode>) => number;
  items: HierarchyRectangularNode<TNode>[];
  transitionDuration: number;
}

export function createArcs<TNode>({ arcs, baseSelection, getArcColor, getNodeID, items, transitionDuration }: CreateArcsProps<TNode>) {
  const arcGroupSelection = getChildSelection<TNode>(baseSelection, 'arc');

  const arcSelection = arcGroupSelection
    .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
    .data(items, getNodeID);

  const arcsEnter = arcSelection.enter().append('path');

  arcsEnter
    .merge(arcSelection)
    .transition()
    .duration(transitionDuration)
    .attr('fill', getArcColor)
    .attr('d', arcs.padded)
    .attr('data-id', getNodeID);

  //animate arc removal
  arcSelection
    .exit<HierarchyRectangularNode<TNode>>()
    .transition()
    .duration(transitionDuration)
    .attr('d', arcs.zero)
    .remove();

  return arcSelection;
}
