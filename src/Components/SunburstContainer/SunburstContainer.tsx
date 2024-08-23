import './SunburstContainer.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useState } from 'react'

import { type BoxDimensions } from '../../Types/BoxDimensions'
import { Sunburst, type SunburstEvent } from '../Sunburst'
import { type IHighlighterWrapper } from '../../Services/Highlighter'
import { HasID } from '../../Types'

export interface SunburstContainerProps<T> {
  duration?: number
  getArcColor: (d: HierarchyRectangularNode<T>) => string
  getItemDetail: (item: HierarchyNode<T>) => string
  highlighter?: IHighlighterWrapper<T>
  nodes: HierarchyRectangularNode<T>[]
  onMouseEnter?: SunburstEvent<T>
  onMouseLeave?: SunburstEvent<T>
  radius: number
  svgDimensions: BoxDimensions
}

export function SunburstContainer<T extends HasID>({
  duration,
  getArcColor,
  getItemDetail,
  highlighter,
  nodes,
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
            isNodeClickable={() => false}
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
