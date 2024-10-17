import { HierarchyNode } from 'd3'

export function getHierarchyNodeAncestors<TNodeData>(hierarchyNode: HierarchyNode<TNodeData>,): HierarchyNode<TNodeData>[] {
  return hierarchyNode.ancestors()
}
