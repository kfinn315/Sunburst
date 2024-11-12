import { Arc, HierarchyRectangularNode, Selection } from "d3";
import { getChildSelection } from "./getChildSelection";
import { SunburstEvent } from "./Types";

interface CreateArcsProps<TNode> {
  arc: Arc<unknown, ArcCoordinates>;
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

export function createArcs<TNode>({ arc, baseSelection, getArcColor, getNodeID, items, transitionDuration, onClick, onMouseEnter, onMouseLeave, getText }: CreateArcsProps<TNode>) {

  const selection = getChildSelection<TNode>(baseSelection, 'arcs');

  //g
  const g = selection
    .selectAll<SVGPathElement, HierarchyRectangularNode<TNode>>('g')
    .data(items, getNodeID)
    .classed('sunburst-center', (d, ix) => ix === 0);

  const gEnter = g.enter().append('g');
  const gExit = g.exit().remove()

  //path
  const path = g.select('path')
  const pathEnter = gEnter.append('path')
  pathEnter
    .on('mouseenter', (ev: MouseEvent, d) => { onMouseEnter?.(ev, d); })
    .on('mouseout', (ev: MouseEvent, d) => { onMouseLeave?.(ev, d); })
    .on('click', (ev: MouseEvent, d) => { onClick?.(ev, d); })
    .attr('data-id', getNodeID)
    .merge(path)
    .transition()
    .duration(transitionDuration)
    .attr('fill', getArcColor)
    .attr('d', arc)

  gExit.select('path').exit().remove()//.transition().duration(transitionDuration).attr('d', arcs.zero).remove()

  function getAngle(d) {
    // Offset the angle by 90 deg since the '0' degree axis for arc is Y axis, while
    // for text it is the X axis.
    const thetaDeg = (180 / Math.PI * (arc.startAngle()(d) + arc.endAngle()(d)) / 2 - 90);
    // If we are rotating the text by more than 90 deg, then "flip" it.
    // This is why "text-anchor", "middle" is important, otherwise, this "flip" would
    // a little harder.
    return (thetaDeg > 90) ? thetaDeg - 180 : thetaDeg;
  }

  //text
  const text = g.select('text')
  const textEnter = gEnter.append('text')
  textEnter.merge(text)
    .text(getText)
    .attr("text-anchor", "middle")
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .attr("pointer-events", "none")
    .transition()
    .duration(transitionDuration)
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

  return selection;
}
