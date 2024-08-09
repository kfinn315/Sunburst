import { HierarchyNode } from 'd3'

export function getHierarchyNodeAncestors<TDatum>(hierarchyNode: HierarchyNode<TDatum>,): HierarchyNode<TDatum>[] {
  return hierarchyNode.ancestors()
}
