import { Arc, HierarchyRectangularNode, Selection } from "d3";
import { ArcCoordinates } from "../Arcs";
import { getChildSelection } from "./getChildSelection";
import { SunburstEvent } from "./Types";

interface CreateMouseArcsProps<TNode> {
  arc: Arc<unknown, ArcCoordinates>;
  baseSelection: Selection<SVGGElement, HierarchyRectangularNode<TNode>, null, undefined>;
  getPathClass: (d: HierarchyRectangularNode<TNode>) => string | null;
  getNodeID: (d: HierarchyRectangularNode<TNode>) => number;
  items: HierarchyRectangularNode<TNode>[];
  onClick: SunburstEvent<TNode>;
  onMouseEnter: SunburstEvent<TNode>;
  onMouseLeave: SunburstEvent<TNode>;
  transitionDuration: number;
}

/**
 * Create a hidden g element to handle mouse pointer interactions
 */
export function createMouseArcs<TNode>({ arc, baseSelection, getPathClass, getNodeID, items, onMouseEnter, onMouseLeave, onClick, transitionDuration }: CreateMouseArcsProps<TNode>) {

  const mouseGroupSelection = getChildSelection<TNode>(baseSelection, 'mousearc');

  mouseGroupSelection.attr('fill', 'none').attr('pointer-events', 'all');

  const mouseArcSelection = mouseGroupSelection
    .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('path')
    .data(items, getNodeID);

  const mouseArcsEnter = mouseArcSelection
    .enter()
    .append('path')
    .attr('class', getPathClass)
    .attr('data-id', getNodeID);

  mouseArcsEnter
    .on('mouseenter', (ev: MouseEvent, d) => { onMouseEnter(ev, d); })
    .on('mouseout', (ev: MouseEvent, d) => { onMouseLeave(ev, d); })
    .on('click', (ev: MouseEvent, d) => { onClick(ev, d); })
    .merge(mouseArcSelection)
    .transition()
    .duration(transitionDuration)
    .attr('d', arc);

  //animate removal - arc radius becomes zero
  mouseArcSelection
    .exit<HierarchyRectangularNode<TNode>>()
    .transition()
    .duration(transitionDuration)
    .attr('d', d => arc.centroid(d))
    .remove();

  return mouseGroupSelection;
}
