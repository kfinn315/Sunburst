import { HierarchyNode } from 'd3'

import { SunburstItem, SunburstItemTreeNode, TreeNode } from '../../Types'
import { getHighlighter, Highlighter } from '../Highlighter'
import { getAncestorElementListProvider } from './getAncestorElementListProvider'
import { getArcElementProvider } from './getArcElementProvider'
import { GetHighlighter } from './Types'

export const getSunburstHighlighter: GetHighlighter<SunburstItem> = (
  gElementRef: React.MutableRefObject<SVGGElement | null>,
): Highlighter<HierarchyNode<TreeNode<SunburstItem>>> => {
  const arcElementProvider = getArcElementProvider(gElementRef)

  const elementProvider = getAncestorElementListProvider<TreeNode<SunburstItem>, SVGGElement>(arcElementProvider)

  return getHighlighter<SunburstItemTreeNode>(elementProvider)
}

