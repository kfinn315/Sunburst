import { HierarchyNode } from "d3";
import { SelectorElementMap, SelectorQueryService } from "../CSS";
import { getHierarchyNodeAncestors } from "../../../../Utils";
import { ElementListMap, SelectorGenerator } from "../../Types";
import { AncestryElementMap } from "./AncestryElementMap";
import { MutableRefElement } from "../../../../Types";

/**
 * An element list that translates HierarchyNodes to a list of ancestor DOM Elements using the provided SelectorGenerator
 */
export class AncestryCSSElementMap<TNodeData, TElement extends Element> extends AncestryElementMap<TNodeData, TElement> implements ElementListMap<HierarchyNode<TNodeData>, TElement> {
  constructor(ref: MutableRefElement, selectorGenerator: SelectorGenerator<TNodeData>) {
    const elementMap = new SelectorElementMap<TNodeData, TElement>(new SelectorQueryService(), selectorGenerator);
    super(ref, elementMap, getHierarchyNodeAncestors<TNodeData>)
  }
}
