import { HierarchyNode } from "d3";
import { ElementGroup, ElementListMap, SelectorGenerator } from "../../Types";
import { AncestryCSSElementMap } from "./AncestryCSSElementMap";
import { CSSClassGroup } from "../CSS";
import BaseHighlighter from "../BaseHighlighter";
import { MutableRefElement } from "../../../../Types";

/**
* Create a Highlighter that adds the highlightClassName to the ancestors' CSS class using the provided SelectorGenerator
*
*/
export default class AncestorHighlighter<TNodeData, TElement extends Element> extends BaseHighlighter<HierarchyNode<TNodeData>, TElement> {
    constructor(ref: MutableRefElement, selectorGenerator: SelectorGenerator<TNodeData>, highlightClassName: string) {
        const elementTranslator: ElementListMap<HierarchyNode<TNodeData>, TElement> = new AncestryCSSElementMap<TNodeData, TElement>(selectorGenerator);
        const highlightGroup: ElementGroup<TElement> = new CSSClassGroup<TElement>(highlightClassName);
        super(ref, elementTranslator, highlightGroup);
    }
}
