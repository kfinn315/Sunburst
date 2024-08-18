import { SunburstItem } from "kfinn315_sunburst";
import { TreeNode } from "../Tree";


export function getValue(d: TreeNode<SunburstItem>): number {
  return d.data?.size ?? 0;
}
