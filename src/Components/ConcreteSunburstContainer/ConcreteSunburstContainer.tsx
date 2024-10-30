import { HierarchyNode, HierarchyRectangularNode, ScaleLinear } from 'd3'

import { RectangleDimensions, SunburstItem, SunburstItemTreeNode } from '../../Types'
import { SunburstEvent } from '../Sunburst'
import { HighlighterFactory } from '../../Services/Highlighter'
import { SunburstContainer } from '../SunburstContainer'
import { partitionTreeLayout, getMin } from '../../Utils'

export interface ConcreteSunburstContainerProps {
  dimensions: RectangleDimensions
  minWidth?: number
  rootNode: HierarchyNode<SunburstItemTreeNode>
  onClick?: SunburstEvent<SunburstItemTreeNode>
  onMouseEnter?: SunburstEvent<SunburstItemTreeNode>
  onMouseLeave?: SunburstEvent<SunburstItemTreeNode>
  highlighterFactory?: HighlighterFactory<HierarchyNode<SunburstItemTreeNode>>
  colorScale: ScaleLinear<string, string>
  centerColor: string
}

/**
 * 
 * A SunburstContainer for SunburstItemTreeNodes
 */
export function ConcreteSunburstContainer({
  dimensions: svgDimensions,
  rootNode,
  highlighterFactory,
  onMouseEnter,
  onMouseLeave,
  colorScale,
  centerColor,
  minWidth = 400,
}: ConcreteSunburstContainerProps) {
  const sideLength = getMin([svgDimensions.width, svgDimensions.height], minWidth)
  const radius = sideLength / 2

  const partitionSize: [number, number] = [2 * Math.PI, Math.pow(radius, 2)]
  
  const nodes = partitionTreeLayout<SunburstItem>(
    rootNode,
    partitionSize
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
      items={nodes}
      getItemDetail={getItemDetail}
      highlighterFactory={highlighterFactory}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      radius={radius}
      svgDimensions={{ width: sideLength, height: sideLength }}
    />
  )
}
