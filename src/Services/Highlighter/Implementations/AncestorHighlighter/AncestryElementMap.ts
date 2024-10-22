import { HierarchyNode } from 'd3'
import { MutableRefElement } from '../../../../Types'
import { ElementListMap, ElementMap } from '../../Types'
import { isNotNull } from '../../../../Utils/isNotNull'

/**
 * Map of items to ancestor document Elements
 *
 * @implements {ElementListMap}
 * @template TNodeData node data type
 * @template TElement document element type (extends Element)
 */
export class AncestryElementMap<TNodeData, TElement extends Element = Element,> implements ElementListMap<HierarchyNode<TNodeData>, TElement> {
  constructor(
    private readonly elementProvider: ElementMap<TNodeData, TElement>,
    private readonly getAncestors: (node: HierarchyNode<TNodeData>) => HierarchyNode<TNodeData>[]) {
  }

  get(ref: MutableRefElement, item: HierarchyNode<TNodeData>): TElement[] {
    return this.getAncestors(item).map(node => this.elementProvider.get(ref, node.data)).filter(x => isNotNull(x)).map(x => x!)
  }

  values(ref: MutableRefElement): TElement[] {
    return this.elementProvider.values(ref) ?? []
  }
}
