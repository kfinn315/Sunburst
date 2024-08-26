import './SunburstContainer.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useState } from 'react'

import { Sunburst, SunburstEvent } from '../Sunburst'
import { HasID, BoxDimensions } from '../../Types'
import { HighlighterFactory } from '../../Services/Highlighter/HighlighterFactory';

export interface SunburstContainerProps<T> {
  getArcColor: (d: HierarchyRectangularNode<T>) => string
  getItemDetail: (item: HierarchyNode<T>) => string
  highlighterFactory?: HighlighterFactory<HierarchyNode<T>>
  nodes: HierarchyRectangularNode<T>[]
  onMouseEnter?: SunburstEvent<T>
  onMouseLeave?: SunburstEvent<T>
  radius: number
  svgDimensions: BoxDimensions
}

export function SunburstContainer<T extends HasID>({
  getArcColor,
  getItemDetail,
  highlighterFactory,
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
            getArcColor={getArcColor}
            highlighterFactory={highlighterFactory}
            isNodeClickable={() => false}
            items={nodes}
            // onClick={onClick}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            radius={radius}
          />
        </svg>
      </div>
      <div className="detail">
        <label>{detail}</label>
      </div>
    </div>
  )
}
