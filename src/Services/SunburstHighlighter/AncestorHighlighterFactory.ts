import { HierarchyNode } from 'd3'

import { SunburstItem, SunburstItemTreeNode, TreeNode } from '../../Types'
import { getHighlighter, Highlighter } from '../Highlighter'
import { getAncestorElementListProvider, getAncestorNodeData } from './getAncestorElementListProvider'
import { getArcElementProvider } from './getArcElementProvider'
import { GetHighlighter } from './Types'
import { IElementProvider, SelectorProvider, ElementProvider } from '../../Utils/ElementProvider'

export class AncestorHighlighterFactory<T, U extends Element> {
    constructor(private readonly selectorProvider: SelectorProvider<T>) { }
    getHighlighter(ref: React.MutableRefObject<SVGGElement | null>): Highlighter<HierarchyNode<T>> {
        if (this.selectorProvider == undefined)
            throw Error("selector provider is undefined")
        const ancestorElementListProvider = getAncestorElementListProvider<T, U>(ElementProvider(ref, this.selectorProvider))
        return getHighlighter<T, U>(ancestorElementListProvider)
    }
}
