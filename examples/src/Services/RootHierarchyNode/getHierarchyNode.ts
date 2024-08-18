import { HierarchyNode } from "d3";
import { TreeNode } from "../Tree";
import { GetTreeNodeHierarchy } from "./Types";

interface getHierarchyNodeProps<T> {
  root: TreeNode<T>;
  getTreeNodeHierarchy: GetTreeNodeHierarchy<T>;
  getValue: (d: TreeNode<T>) => number;
  compare: (a: HierarchyNode<TreeNode<T>>, b: HierarchyNode<TreeNode<T>>) => number;
}

export function getHierarchyNode<T>({ root, getTreeNodeHierarchy, getValue, compare }: getHierarchyNodeProps<T>): HierarchyNode<TreeNode<T>> {
  return getTreeNodeHierarchy(root).sum(getValue).sort(compare);
}
