import { HierarchyNode, HierarchyRectangularNode, min, ScaleLinear } from 'd3'

import { SunburstItem, SunburstItemTreeNode, BoxDimensions } from '../../Types'
import { getPartitionTreeLayout } from '../../Services/PartitionLayout'
import { SunburstEvent } from '../Sunburst'
import { HighlighterFactory } from '../../Services/Highlighter'
import { SunburstContainer } from './SunburstContainer'

export interface SunburstItemSunburstContainerProps {
  dimensions: BoxDimensions
  minWidth?: number
  rootNode: HierarchyNode<SunburstItemTreeNode>
  onClick?: SunburstEvent<SunburstItemTreeNode>
  onMouseEnter?: SunburstEvent<SunburstItemTreeNode>
  onMouseLeave?: SunburstEvent<SunburstItemTreeNode>
  highlighterFactory?: HighlighterFactory<HierarchyNode<SunburstItemTreeNode>>
  colorScale: ScaleLinear<string, string>
  centerColor: string
}

export function SunburstItemSunburstContainer({
  dimensions,
  rootNode,
  highlighterFactory,
  onMouseEnter,
  onMouseLeave,
  colorScale,
  centerColor,
  minWidth = 20,
}: SunburstItemSunburstContainerProps) {
  const svgSide = getSVGDimensions(dimensions, minWidth)
  const radius = svgSide / 2

  const nodes = getPartitionTreeLayout<SunburstItem>(
    rootNode,
    {
      width: 2 * Math.PI,
      height: radius * radius,
    },
  ).descendants()

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
      nodes={nodes}
      getItemDetail={getItemDetail}
      highlighterFactory={highlighterFactory}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      radius={radius}
      svgDimensions={{ width: svgSide, height: svgSide }}
    />
  )
}

export function getSVGDimensions(dimensions: BoxDimensions, minWidth: number) {
  return min([dimensions.height, dimensions.width]) ?? minWidth
}
