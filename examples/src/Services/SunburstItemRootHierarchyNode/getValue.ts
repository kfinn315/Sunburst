import { SunburstItem } from "../../sunburstLibrary";
import { TreeNode } from "../Tree";


export function getValue(d: TreeNode<SunburstItem>): number {
  return d.data?.size ?? 0;
}
