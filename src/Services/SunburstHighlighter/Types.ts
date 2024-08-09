import { HierarchyNode } from 'd3'

import { Highlighter } from '../Highlighter'
import { TreeNode } from '../../Types'

export type GetHighlighter<TData> = (
  gElementRef: React.MutableRefObject<SVGGElement | null>,
) => Highlighter<HierarchyNode<TreeNode<TData>>>
