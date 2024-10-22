import { HierarchyNode } from "d3";
import { MutableRefElement } from "../../../../Types";
import { Highlighter, HighlighterFactory, SelectorGenerator } from "../../Types";
import { AncestorHighlighter } from ".";

export class AncestorHighlighterFactory<TNodeData, TElement extends Element> implements HighlighterFactory<HierarchyNode<TNodeData>> {
    constructor(
        private readonly selector: SelectorGenerator<TNodeData>,
        private readonly highlightClassName: string) {
    }

    get(ref: MutableRefElement): Highlighter<HierarchyNode<TNodeData>> {
        return new AncestorHighlighter<TNodeData, TElement>(ref, this.selector, this.highlightClassName)
    }
}
