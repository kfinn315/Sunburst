import { HierarchyNode, HierarchyRectangularNode, partition, } from 'd3'

import { TreeNode } from '../Types'

export default function partitionTreeLayout<TData>(
  rootHierarchyNode: HierarchyNode<TreeNode<TData>>,
  layoutSize: [number, number],
): HierarchyRectangularNode<TreeNode<TData>> {
  const partitionLayout = partition<TreeNode<TData>>().size(layoutSize)
  return partitionLayout(rootHierarchyNode)
}
