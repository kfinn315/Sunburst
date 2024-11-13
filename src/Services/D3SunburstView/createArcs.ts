import { Arc, HierarchyRectangularNode, Selection } from "d3";
import { getChildSelection } from "./getChildSelection";
import { SunburstEvent } from "./Types";
import { ArcCoordinates, Arcs } from "../Arcs";
import { getArc } from "../Arcs/DefaultArcs/getArc";

interface Props<TNode> {
  arcs: Arcs,
  baseSelection: Selection<SVGGElement, HierarchyRectangularNode<TNode>, null, undefined>;
  getArcColor: (d: HierarchyRectangularNode<TNode>) => string;
  getNodeID: (d: HierarchyRectangularNode<TNode>) => number;
  onClick?: SunburstEvent<TNode>;
  onMouseEnter?: SunburstEvent<TNode>;
  onMouseLeave?: SunburstEvent<TNode>;
  items: HierarchyRectangularNode<TNode>[];
  transitionDuration: number;
  getText?: (d: HierarchyRectangularNode<TNode>) => string | undefined
}

export function createArcs<TNode>({ arcs, baseSelection, getArcColor, getNodeID, items, transitionDuration, onClick, onMouseEnter, onMouseLeave, getText }: Props<TNode>) {

  const selection = getChildSelection<TNode>(baseSelection, 'arcs');

  //g
  const g = selection
    .selectAll<SVGGElement, HierarchyRectangularNode<TNode>>('g')
    .data(items, getNodeID)
    .classed('sunburst-center', (d, ix) => ix === 0);

  const gEnter = g.enter().append('g');
  const gExit = g.exit()

  //path
  const path = g.select('path')
  const pathEnter = gEnter.append('path')
  const arcBig = getArc(0.1)

  pathEnter
    .attr('d', arcs.zero)
    .attr('data-id', getNodeID)
    .on('mouseenter', (ev: MouseEvent, d) => { onMouseEnter?.(ev, d); })
    .on('mouseout', (ev: MouseEvent, d) => { onMouseLeave?.(ev, d); })
    .on('click', (ev: MouseEvent, d) => { onClick?.(ev, d); })
    .merge(path)
    .transition()
    .duration(transitionDuration)
    .attr('d', arcs.padded)
    .attr('fill', getArcColor)

  gExit
    .select('path')
    .transition()
    .duration(transitionDuration)
    .attr('d', arcBig)

  setText(g, gEnter, gExit, transitionDuration, getText, arcs.padded)

  gExit
    .transition().duration(transitionDuration)
    .remove()

  return selection;
}

function setText<TNode>(
  g: Selection<SVGGElement, HierarchyRectangularNode<TNode>, unknown, unknown>,
  gEnter: Selection<SVGGElement, HierarchyRectangularNode<TNode>, unknown, unknown>,
  gExit: Selection<SVGGElement, HierarchyRectangularNode<TNode>, unknown, unknown>,
  transitionDuration: number | undefined,
  getText: ((d: HierarchyRectangularNode<TNode>) => string | undefined) | undefined,
  arc: Arc<unknown, ArcCoordinates>) {

  function getAngle(d: HierarchyRectangularNode<TNode>) {
    // Offset the angle by 90 deg since the '0' degree axis for arc is Y axis, while
    // for text it is the X axis.
    const thetaDeg = (180 / Math.PI * (arc.startAngle()(d) + arc.endAngle()(d)) / 2 - 90);
    // If we are rotating the text by more than 90 deg, then "flip" it.
    // This is why "text-anchor", "middle" is important, otherwise, this "flip" would
    // a little harder.
    return (thetaDeg > 90) ? thetaDeg - 180 : thetaDeg;
  }

  //text
  const text = g.select<SVGTextElement>('text')
  const textEnter = gEnter.append('text')
  textEnter
    .attr("text-anchor", "middle")
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .attr("pointer-events", "none")
    .merge(text)
    .text(getText)
    .attr("display", function (d) { return d.depth ? null : "none"; }) // hide inner ring
    .attr("transform", function (d) {
      if (d.depth > 0) {
        return "translate(" + arc.centroid(d).toString() + ")" +
          "rotate(" + getAngle(d) + ")";
      } else {
        return null;
      }
    })
    .attr("x", function (d) { return d.x; })

  gExit
    .select('text')
    .remove()

}
