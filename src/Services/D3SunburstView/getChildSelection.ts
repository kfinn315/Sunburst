import { HierarchyRectangularNode, Selection } from "d3";

/**
* Return selection of <g class="{className}"></g> element that is a child of baseSelection, create it if non-existant.
**/
export function getChildSelection<TNode>(baseSelection: Selection<SVGGElement, HierarchyRectangularNode<TNode>, null, undefined>, className: string) {
  let arcGroupSelection = baseSelection.select<SVGGElement>('.' + className);

  if (arcGroupSelection == null || arcGroupSelection.size() === 0) {
    arcGroupSelection = baseSelection.append('g').attr('class', className);
  }
  return arcGroupSelection;
}
