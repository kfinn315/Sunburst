import { HierarchyNode, HierarchyRectangularNode, partition, } from 'd3'

import { TreeNode } from '../Types'

export default function partitionTreeLayout<TData>(
  rootHierarchyNode: HierarchyNode<TreeNode<TData>>,
  size: [number, number],
): HierarchyRectangularNode<TreeNode<TData>> {
  const partitionLayout = partition<TreeNode<TData>>().size(size)
  return partitionLayout(rootHierarchyNode)
}
