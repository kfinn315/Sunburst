import { HierarchyNode, hierarchy } from "d3";
import { TreeNode } from "../Tree";

/**
 * Demonstrates the Template Method Design Pattern for creation of HierarchyNodes
 */
export abstract class AbstractHierarchy<T> {
  public createNode(items: T[]): HierarchyNode<TreeNode<T>> {
    const tree = this.createTree(items);
    const hierarchyNode = hierarchy(tree, this.getChildren).sum(this.sum).sort(this.sort);
    return hierarchyNode;

  }
  abstract createTree(item: T[]): TreeNode<T>;
  abstract sum(d: TreeNode<T>): number;
  abstract sort(a: HierarchyNode<TreeNode<T>>, b: HierarchyNode<TreeNode<T>>): number;
  abstract getChildren(d: TreeNode<T>): IterableIterator<TreeNode<T>> | null | undefined;
}
