import { getHierarchyNode as baseGetHierarchyNode, getTreeNodeHierarchy } from "../RootHierarchyNode";
import { TreeNode } from "../Tree";
import { getValue } from "./getValue";
import { compare } from "./compare";
import { HierarchyNode } from "d3";
import { SunburstItem } from "../../sunburstLibrary";

export function getHierarchyNode(root: TreeNode<SunburstItem>): HierarchyNode<TreeNode<SunburstItem>> {
    return baseGetHierarchyNode({ root, getTreeNodeHierarchy, getValue, compare });
}
