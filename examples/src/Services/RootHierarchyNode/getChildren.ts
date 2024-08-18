import { TreeNode } from "../Tree";

export function getChildren<TData>(treeNode: TreeNode<TData>) {
  return treeNode.children;
}
