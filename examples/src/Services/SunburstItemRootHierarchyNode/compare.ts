import { SunburstItem } from "kfinn315_sunburst";
import { TreeNode } from "../Tree";
import { getValue } from './getValue';

export function compare(
  nodeA: { data: TreeNode<SunburstItem> },
  nodeB: { data: TreeNode<SunburstItem> },
) {
  return getValue(nodeB.data) - getValue(nodeA.data);
}
