import {
  HierarchyNode,
  HierarchyRectangularNode,
  partition,
} from 'd3'

import { BoxDimensions, TreeNode } from '../../Types'

export function getPartitionTreeLayout<TData>(
  rootHierarchyNode: HierarchyNode<TreeNode<TData>>,
  dimensions: BoxDimensions,
): HierarchyRectangularNode<TreeNode<TData>> {
  const partitionLayout = partition<TreeNode<TData>>().size([dimensions.width, dimensions.height])
  return partitionLayout(rootHierarchyNode)
}
