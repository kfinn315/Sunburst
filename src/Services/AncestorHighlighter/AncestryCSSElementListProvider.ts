import { HierarchyNode } from "d3";
import { CSSElementProvider, CSSQueryService, SelectorGenerator } from "../../Utils/ElementProvider";
import { getHierarchyNodeAncestors } from "../../Utils/getHierarchyNodeAncestors";
import { AncestoryElementListProvider } from "./AncestoryElementListProvider";
import { ElementListProvider } from "../Highlighter";

export class AncestryCSSElementListProvider<TNodeData, TElement extends Element> extends AncestoryElementListProvider<TNodeData, TElement> implements ElementListProvider<HierarchyNode<TNodeData>, TElement> {
  constructor(selectorGenerator: SelectorGenerator<TNodeData>) {
    const elementProvider = new CSSElementProvider<TNodeData, TElement>(new CSSQueryService(), selectorGenerator);
    super(elementProvider, getHierarchyNodeAncestors<TNodeData>)
  }
}
