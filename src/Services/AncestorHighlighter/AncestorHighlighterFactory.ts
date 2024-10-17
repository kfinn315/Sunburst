import { HierarchyNode } from 'd3'

import { DefaultHighlighter, ElementListProvider, Highlighter } from '../Highlighter'
import { SelectorGenerator } from '../../Utils/ElementProvider'
import { HighlighterFactory } from '../Highlighter/HighlighterFactory'
import CSSClassGroup from '../../Utils/CSSClassModifier/CSSClassGroup'
import { AncestryCSSElementListProvider } from './AncestryCSSElementListProvider'
import { MutableRefElement } from '../../Types/MutableRefElement';
import { ElementGroup } from '../../Utils/CSSClassModifier/Types'

/**
 * Create a Highlighter that adds the highlightClassName to ancestors' css elements using the provided cssSelectorGenerator
 *
 */
export class AncestorHighlighterFactory<TNodeData, TElement extends Element> implements HighlighterFactory<HierarchyNode<TNodeData>> {
    constructor(
        private readonly selectorGenerator: SelectorGenerator<TNodeData>,
        private readonly highlightClassName: string) {
    }

    get(ref: MutableRefElement): Highlighter<HierarchyNode<TNodeData>> {
        if (this.selectorGenerator == undefined)
            throw Error("cssSelectorGenerator undefined")
        const elementListProvider: ElementListProvider<HierarchyNode<TNodeData>, TElement> = new AncestryCSSElementListProvider<TNodeData, TElement>(this.selectorGenerator)
        const highlightGroup: ElementGroup<TElement> = new CSSClassGroup<TElement>(this.highlightClassName)
        const highlighter: Highlighter<HierarchyNode<TNodeData>> = new DefaultHighlighter<HierarchyNode<TNodeData>, TElement>(ref, elementListProvider, highlightGroup)
        return highlighter
    }
}
