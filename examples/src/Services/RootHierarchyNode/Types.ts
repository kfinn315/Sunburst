import { HierarchyNode } from "d3";
import { TreeNode } from "../Tree";

export type GetTreeNodeHierarchy<TData> = (root: TreeNode<TData>) => HierarchyNode<TreeNode<TData>>;
