import { HierarchyNode, partition } from "d3";
import { TreeNode } from "../../Types";

export default function getHierarchyNodes<T>(rootNode: HierarchyNode<TreeNode<T>>, layoutSize: number[]) {
  return partition<T>().size(layoutSize)(rootNode).descendants();
}
