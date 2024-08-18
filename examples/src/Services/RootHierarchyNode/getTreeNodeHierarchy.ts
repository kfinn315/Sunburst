import { hierarchy, HierarchyNode } from 'd3'

import { TreeNode } from '../Tree'
import { getChildren } from './getChildren'

export function getTreeNodeHierarchy<TData>(root: TreeNode<TData>,): HierarchyNode<TreeNode<TData>> {
  return hierarchy(root, getChildren)
}
