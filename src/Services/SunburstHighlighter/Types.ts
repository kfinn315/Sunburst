import { HierarchyNode } from 'd3'

import { Highlighter } from '../Highlighter'

export type GetHighlighter<TData> = (
  gElementRef: React.MutableRefObject<SVGGElement | null>,
) => Highlighter<HierarchyNode<TData>>
