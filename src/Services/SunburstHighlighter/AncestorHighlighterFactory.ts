import { HierarchyNode } from 'd3'

import { getHighlighter, Highlighter } from '../Highlighter'
import { getAncestorElementListProvider } from './getAncestorElementListProvider'
import { SelectorProvider, ElementProvider } from '../../Utils/ElementProvider'

export class AncestorHighlighterFactory<T, U extends Element> {
    constructor(private readonly selectorProvider: SelectorProvider<T>) { }
    getHighlighter(ref: React.MutableRefObject<SVGGElement | null>): Highlighter<HierarchyNode<T>> {
        if (this.selectorProvider == undefined)
            throw Error("selector provider is undefined")
        const ancestorElementListProvider = getAncestorElementListProvider<T, U>(ElementProvider(ref, this.selectorProvider))
        return getHighlighter<T, U>(ancestorElementListProvider)
    }
}
