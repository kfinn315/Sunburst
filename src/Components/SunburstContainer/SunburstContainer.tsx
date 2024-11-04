import './SunburstContainer.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useState } from 'react'

import { Sunburst, SunburstEvent } from '../Sunburst'
import { HasID, RectangleDimensions } from '../../Types'
import { CreateHighlighter } from '../../Services/Highlighter'
import UnscaledSVG from '../UnscaledSVG/UnscaledSVG'

export interface SunburstContainerProps<T> {
  getArcColor: (d: HierarchyRectangularNode<T>) => string
  getItemDetail: (item: HierarchyNode<T>) => string
  highlighterFactory?: CreateHighlighter<HierarchyNode<T>>
  items: HierarchyRectangularNode<T>[]
  onMouseEnter?: SunburstEvent<T>
  onMouseLeave?: SunburstEvent<T>
  radius: number
  svgDimensions: RectangleDimensions
}

export default function SunburstContainer<T extends HasID>({
  getArcColor,
  getItemDetail,
  highlighterFactory,
  items,
  onMouseEnter,
  onMouseLeave,
  radius,
  svgDimensions
}: SunburstContainerProps<T>) {
  const [detail, setDetail] = useState<string | undefined>()

  const mouseEnterHandler: SunburstEvent<T> = (event: MouseEvent, d: HierarchyNode<T>,) => {
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
        <UnscaledSVG width={svgDimensions.width} height={svgDimensions.height}>
          <Sunburst<T>
            getArcColor={getArcColor}
            highlighterFactory={highlighterFactory}
            isNodeClickable={() => false}
            items={items}
            // onClick={onClick}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            radius={radius}
          />
        </UnscaledSVG>
      </div>
      <div className="detail">
        <label>{detail}</label>
      </div>
    </div >
  )
}
