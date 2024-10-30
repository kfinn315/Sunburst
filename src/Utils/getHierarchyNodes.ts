import { HierarchyNode } from "d3";
import { TreeNode } from "../Types";
import { partitionTreeLayout } from ".";

export default function getHierarchyNodes<T>(rootNode: HierarchyNode<TreeNode<T>>, layoutSize: number[]) {
  return partitionTreeLayout<T>(
    rootNode,
    layoutSize
  ).descendants();
}
