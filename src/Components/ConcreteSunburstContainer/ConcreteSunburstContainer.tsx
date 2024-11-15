import { HierarchyNode, HierarchyRectangularNode, ScaleLinear } from 'd3'

import { RectangleDimensions, TreeNodeSunburstItem, SunburstEvent } from '../../Types'
import { CreateHighlighter } from '../../Services/Highlighter'
import { SunburstContainer } from '../SunburstContainer'
import { getMin } from '../../Utils'
import { getCirclePartitionLayout } from '../../Utils/d3/getCirclePartitionLayout'

interface Props {
  dimensions: RectangleDimensions
  minWidth?: number
  rootHierarchyNode: HierarchyNode<TreeNodeSunburstItem>
  onClick?: SunburstEvent<TreeNodeSunburstItem>
  onMouseEnter?: SunburstEvent<TreeNodeSunburstItem>
  onMouseLeave?: SunburstEvent<TreeNodeSunburstItem>
  createHighlighter?: CreateHighlighter<HierarchyNode<TreeNodeSunburstItem>>
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
  createHighlighter,
  onMouseEnter,
  onMouseLeave,
  colorScale,
  centerColor,
  minWidth = 400,
}: Props) {
  const sideLength = getMin([svgDimensions.width, svgDimensions.height], minWidth)
  const radius = sideLength / 2

  const descendantNodes = getCirclePartitionLayout<TreeNodeSunburstItem>(radius)(rootHierarchyNode).descendants()

  const getArcColor = (d: HierarchyRectangularNode<TreeNodeSunburstItem>) =>
    d.data.data?.color ? colorScale(d.data.data.color) : centerColor

  function getItemDetail(item: HierarchyNode<TreeNodeSunburstItem>): string {
    return item
      .ancestors()
      .map((x) => x.data.name ?? '?')
      .reverse()
      .slice(1) //remove "root"
      .join('.')
  }

  return (
    <SunburstContainer<TreeNodeSunburstItem>
      getArcColor={getArcColor}
      items={descendantNodes}
      getItemDetail={getItemDetail}
      createHighlighter={createHighlighter}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      radius={radius}
      svgDimensions={{ width: sideLength, height: sideLength }}
    />
  )
}
