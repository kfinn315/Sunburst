import { HierarchyNode } from 'd3'

import { IElementProvider } from '../../Utils/ElementProvider'
import { getHierarchyNodeAncestors } from '../../Utils/getHierarchyNodeAncestors'
import { isNotNull } from '../../Utils/isNotNull'
import { ElementListProvider } from '../Highlighter'

export function getElements<Datum, TElement extends Element>(provider: IElementProvider<Datum, TElement>, items: Datum[]): TElement[] {
  return items.map(provider.get).filter(x => isNotNull(x)).map(x => x as TElement)
}

export function getAncestorNodeData<T>(hierarchyNode: HierarchyNode<T>) {
  return getHierarchyNodeAncestors(hierarchyNode).map(hierarchyNode => hierarchyNode.data)
}

export function getAncestorElementListProvider<TDatum, TElement extends Element = Element,>(
  elementProvider: IElementProvider<TDatum, TElement>,
): ElementListProvider<HierarchyNode<TDatum>, TElement> {
  return {
    get(hierarchyNode: HierarchyNode<TDatum>): TElement[] {
      return getElements(elementProvider, getAncestorNodeData(hierarchyNode))
    },
    getAll(): TElement[] {
      return elementProvider.getAll() ?? []
    },
  }
}
