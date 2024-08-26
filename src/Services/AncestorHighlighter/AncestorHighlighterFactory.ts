import { HierarchyNode } from 'd3'

import { getHighlighter, Highlighter } from '../Highlighter'
import { getAncestorElementListProvider } from './getAncestorElementListProvider'
import { SelectorProvider, ElementProvider, Queryer } from '../../Utils/ElementProvider'
import { HighlighterFactory } from '../Highlighter/HighlighterFactory'

export class AncestorHighlighterFactory<T, U extends Element> implements HighlighterFactory<HierarchyNode<T>> {
    constructor(private readonly selectorProvider: SelectorProvider<T>) { }
    get(queryer: Queryer): Highlighter<HierarchyNode<T>> {
        if (this.selectorProvider == undefined)
            throw Error("selector provider is undefined")
        const ancestorElementListProvider = getAncestorElementListProvider<T, U>(ElementProvider(queryer, this.selectorProvider))
        return getHighlighter<HierarchyNode<T>, U>(ancestorElementListProvider)
    }
}
