import { HierarchyNode, HierarchyRectangularNode, ScaleLinear } from 'd3'

import { RectangleDimensions, SunburstItemTreeNode } from '../../Types'
import { SunburstEvent } from '../Sunburst'
import { CreateHighlighter } from '../../Services/Highlighter'
import { SunburstContainer } from '../SunburstContainer'
import { getMin } from '../../Utils'
import { getCirclePartitionLayout } from '../../Utils/d3/getCirclePartitionLayout'

export interface ConcreteSunburstContainerProps {
  dimensions: RectangleDimensions
  minWidth?: number
  rootHierarchyNode: HierarchyNode<SunburstItemTreeNode>
  onClick?: SunburstEvent<SunburstItemTreeNode>
  onMouseEnter?: SunburstEvent<SunburstItemTreeNode>
  onMouseLeave?: SunburstEvent<SunburstItemTreeNode>
  highlighterFactory?: CreateHighlighter<HierarchyNode<SunburstItemTreeNode>>
  colorScale: ScaleLinear<string, string>
  centerColor: string
}

/**
 * 
 * A SunburstContainer for SunburstItemTreeNodes
 */
export function ConcreteSunburstContainer({
  dimensions: svgDimensions,
  rootHierarchyNode,
  highlighterFactory,
  onMouseEnter,
  onMouseLeave,
  colorScale,
  centerColor,
  minWidth = 400,
}: ConcreteSunburstContainerProps) {
  const sideLength = getMin([svgDimensions.width, svgDimensions.height], minWidth)
  const radius = sideLength / 2

  const descendantNodes = getCirclePartitionLayout<SunburstItemTreeNode>(radius)(rootHierarchyNode).descendants()

  const getArcColor = (d: HierarchyRectangularNode<SunburstItemTreeNode>) =>
    d.data.data?.color ? colorScale(d.data.data.color) : centerColor

  function getItemDetail(item: HierarchyNode<SunburstItemTreeNode>): string {
    return item
      .ancestors()
      .map((x) => x.data.name ?? '?')
      .reverse()
      .slice(1) //remove "root"
      .join('.')
  }

  return (
    <SunburstContainer<SunburstItemTreeNode>
      getArcColor={getArcColor}
      items={descendantNodes}
      getItemDetail={getItemDetail}
      highlighterFactory={highlighterFactory}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      radius={radius}
      svgDimensions={{ width: sideLength, height: sideLength }}
    />
  )
}
