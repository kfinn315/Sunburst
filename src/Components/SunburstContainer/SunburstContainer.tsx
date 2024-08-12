import './SunburstContainer.css'

import { HierarchyNode, HierarchyRectangularNode, min, ScaleLinear } from 'd3'
import { useState } from 'react'

import { type SunburstItem, type SunburstItemTreeNode, type TreeNode } from '../../Types'
import { getPartitionTreeLayout } from '../../Services/PartitionLayout'
import { type BoxDimensions } from '../../Types/BoxDimensions'
import { Sunburst, type SunburstEvent } from '../Sunburst'
import { type IHighlighterWrapper } from '../../Services/Highlighter'

export interface SunburstContainerProps<T> {
  duration?: number
  getArcColor: (d: HierarchyRectangularNode<T>) => string
  getItemDetail: (item: HierarchyNode<T>) => string
  highlighter?: IHighlighterWrapper<T>
  minWidth?: number
  nodes: HierarchyRectangularNode<T>[]
  onClick?: SunburstEvent<T>
  onMouseEnter?: SunburstEvent<T>
  onMouseLeave?: SunburstEvent<T>
  radius: number
  svgDimensions: BoxDimensions
}

export function SunburstContainer<T extends { id: number }>({
  duration,
  getArcColor,
  getItemDetail,
  highlighter,
  minWidth = 20,
  nodes,
  onClick,
  onMouseEnter,
  onMouseLeave,
  radius,
  svgDimensions
}: SunburstContainerProps<T>) {
  const [detail, setDetail] = useState<string | undefined>()

  const mouseEnterHandler: SunburstEvent<T> = (
    event: MouseEvent,
    d: HierarchyNode<T>,
  ) => {
    setDetail(getItemDetail(d))
    onMouseEnter?.(event, d)
  }

  const mouseLeaveHandler: SunburstEvent<T> = (event, d) => {
    setDetail(undefined)
    onMouseLeave?.(event, d)
  }

  return (
    <div className="visualization-wrapper">
      <div className="sunburst-wrapper">
        <svg
          width={svgDimensions.width}
          height={svgDimensions.height}
          viewBox={`0 0 ${String(svgDimensions.width)} ${String(svgDimensions.height)}`}
        >
          <Sunburst<T>
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
