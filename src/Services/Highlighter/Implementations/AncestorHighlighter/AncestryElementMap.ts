import { HierarchyNode } from 'd3'
import { ElementListMap, ElementMap } from '../../Types'
import { isNotNull } from '../../../../Utils'

/**
 * Map of items to ancestor document Elements
 *
 * @implements {ElementListMap}
 * @template TNodeData node data type
 * @template TElement document element type (extends Element)
 */
export class AncestryElementMap<TNodeData, TElement extends Element = Element,> implements ElementListMap<HierarchyNode<TNodeData>, TElement> {
  constructor(
    private readonly elementMap: ElementMap<TNodeData, TElement>,
    private readonly getAncestors: (node: HierarchyNode<TNodeData>) => TNodeData[]) {
  }

  get(item: HierarchyNode<TNodeData>): TElement[] {
    return this.getAncestors(item)?.map(data => this.elementMap.get(data)).filter(x => isNotNull(x)) as TElement[]
  }

  values(): TElement[] {
    return this.elementMap.values() ?? []
  }
}
