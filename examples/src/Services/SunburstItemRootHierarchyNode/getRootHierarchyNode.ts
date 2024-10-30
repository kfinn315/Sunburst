import { getRootHierarchyNode as baseGetRootHierarchyNode } from "../RootHierarchyNode"
import { getHierarchyNode } from "./getHierarchyNode"
import { createSunburstItemTree } from "./createSunburstItemTree"
import { SunburstItem } from '../../sunburstLibrary'

export function getRootHierarchyNode(items: readonly SunburstItem[]) {
    return baseGetRootHierarchyNode<SunburstItem>(items, createSunburstItemTree, getHierarchyNode)
}
