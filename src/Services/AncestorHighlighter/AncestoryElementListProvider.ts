import { HierarchyNode } from 'd3'

import { ElementProvider } from '../../Utils/ElementProvider'
import { isNotNull } from '../../Utils/isNotNull'
import { ElementListProvider } from '../Highlighter'
import { MutableRefElement } from '../../Types/MutableRefElement'

/**
 * Returns ancestors of the hierarchyNode using the elementProvider and getAncestors method
 *
 * @export
 * @class AncestoryElementListProvider
 * @implements {ElementListProvider}
 * @template TNodeData
 * @template TOut
 */
export class AncestoryElementListProvider<TNodeData, TOut extends Element = Element,> implements ElementListProvider<HierarchyNode<TNodeData>, TOut> {
  constructor(
    private readonly elementProvider: ElementProvider<TNodeData, TOut>,
    private readonly getAncestors: (node: HierarchyNode<TNodeData>) => HierarchyNode<TNodeData>[]) {
  }

  getAll(ref: MutableRefElement): TOut[] {
    return this.elementProvider.getAll(ref) ?? []
  }

  get(ref: MutableRefElement, item: HierarchyNode<TNodeData>): TOut[] {
    return this.getAncestors(item).map(node => this.elementProvider.get(ref, node.data)).filter(x => isNotNull(x)).map(x => x!)
  }

}
