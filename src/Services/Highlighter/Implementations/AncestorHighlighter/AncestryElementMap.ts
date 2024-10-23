import { HierarchyNode } from 'd3'
import { MutableRefElement } from '../../../../Types'
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
    private readonly ref: MutableRefElement,
    private readonly elementProvider: ElementMap<TNodeData, TElement>,
    private readonly getAncestors: (node: HierarchyNode<TNodeData>) => HierarchyNode<TNodeData>[]) {
  }

  get(item: HierarchyNode<TNodeData>): TElement[] {
    return this.getAncestors(item).map(node => this.elementProvider.get(this.ref, node.data)).filter(x => isNotNull(x)).map(x => x!)
  }

  values(): TElement[] {
    return this.elementProvider.values(this.ref) ?? []
  }
}
