import './SunburstContainer.css'

import { HierarchyNode, HierarchyRectangularNode, min, ScaleLinear } from 'd3'
import { useState } from 'react'

import { SunburstItem, SunburstItemTreeNode,TreeNode } from '../../Types'
import { getPartitionTreeLayout } from '../../Services/PartitionLayout'
import { BoxDimensions } from '../../Types/BoxDimensions'
import { Sunburst, SunburstEvent } from '../Sunburst'
import { IHighlighterWrapper } from '../../Services/Highlighter'

export interface SunburstContainerProps {
  dimensions: BoxDimensions
  minWidth?: number
  duration?: number
  rootNode: HierarchyNode<TreeNode<SunburstItem>>
  onClick?: SunburstEvent<SunburstItemTreeNode>
  onMouseEnter?: SunburstEvent<SunburstItemTreeNode>
  onMouseLeave?: SunburstEvent<SunburstItemTreeNode>
  highlighter?: IHighlighterWrapper<SunburstItem>
  colorScale: ScaleLinear<string, string>
  centerColor: string
}

export function SunburstContainer({
  dimensions,
  rootNode,
  highlighter,
  onMouseEnter,
  onMouseLeave,
  colorScale,
  centerColor,
  duration,
  minWidth = 20,
}: SunburstContainerProps) {
  const [detail, setDetail] = useState<string | undefined>()

  const svgDimension = getSVGDimensions(dimensions, minWidth)
  const radius = svgDimension / 2
  const sunburstDimensions: BoxDimensions = {
    width: 2 * Math.PI,
    height: radius * radius,
  }

  const nodes = getPartitionTreeLayout<SunburstItem>(
    rootNode,
    sunburstDimensions,
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

  const mouseEnterHandler: SunburstEvent<SunburstItemTreeNode> = (
    event: MouseEvent,
    d: HierarchyNode<SunburstItemTreeNode>,
  ) => {
    setDetail(getItemDetail(d))
    onMouseEnter?.(event, d)
  }

  const mouseLeaveHandler: SunburstEvent<SunburstItemTreeNode> = (event, d) => {
    setDetail(undefined)
    onMouseLeave?.(event, d)
  }

  return (
    <div className="visualization-wrapper">
      <div className="sunburst-wrapper">
        <svg
          width={svgDimension}
          height={svgDimension}
          viewBox={`0 0 ${String(svgDimension)} ${String(svgDimension)}`}
        >
          <Sunburst<SunburstItem>
            highlighter={highlighter}
            getArcColor={getArcColor}
            radius={radius}
            items={nodes}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            isArcClickable={() => false}
            duration={duration}
          />
        </svg>
      </div>
      <div className="detail">
        <label>{detail}</label>
      </div>
    </div>
  )
}

export function getSVGDimensions(dimensions: BoxDimensions, minWidth: number) {
  return min([dimensions.height, dimensions.width]) ?? minWidth
}
