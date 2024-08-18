import { HierarchyNode } from "d3";
import { TreeNode } from "../Tree";
import { GetTreeNodeHierarchy } from "./Types";

type CreateTreeMethod<T> = (items: readonly T[]) => TreeNode<T>

export function getRootHierarchyNode<T>(items: readonly T[], createTree: CreateTreeMethod<T>, getHierarchyNode: GetTreeNodeHierarchy<T>,
): HierarchyNode<TreeNode<T>> {
  return getHierarchyNode(createTree(items));
}
