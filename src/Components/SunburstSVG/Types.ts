import { HierarchyRectangularNode } from "d3";
import { HasChildren } from "../../Types";

/**
 * Create list of `HierarchyRectangularNodes` from a `node` and `layoutRadius`. These can be used to plot d3 arcs.
 */
export type GetHierarachyNodeDescendants<T extends HasChildren> = (node: T, layoutRadius: number) => HierarchyRectangularNode<T>[]
