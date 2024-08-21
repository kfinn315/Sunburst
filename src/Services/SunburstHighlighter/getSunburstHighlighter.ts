import { SunburstItemTreeNode } from '../../Types'
import { GetHighlighter } from './Types'
import { AncestorHighlighterFactory } from './AncestorHighlighterFactory'
import { arcSelectorProvider } from './arcSelectorProvider'

const factory = new AncestorHighlighterFactory<SunburstItemTreeNode, Element>(arcSelectorProvider)

export const getSunburstHighlighter: GetHighlighter<SunburstItemTreeNode> = (ref: React.MutableRefObject<SVGGElement | null>) => factory.getHighlighter(ref)
