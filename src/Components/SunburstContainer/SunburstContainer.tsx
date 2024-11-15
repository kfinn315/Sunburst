import './SunburstContainer.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useState } from 'react'

import { HasID, RectangleDimensions, SunburstEvent } from '../../Types'
import { CreateHighlighter } from '../../Services/Highlighter'
import { SunburstSVG } from '../SunburstSVG'

interface Props<T> {
  getArcColor: (d: HierarchyRectangularNode<T>) => string
  getItemDetail: (item: HierarchyNode<T>) => string
  createHighlighter?: CreateHighlighter<HierarchyNode<T>>
  items: HierarchyRectangularNode<T>[]
  onMouseEnter?: SunburstEvent<T>
  onMouseLeave?: SunburstEvent<T>
  radius: number
  svgDimensions: RectangleDimensions
}

export default function SunburstContainer<T extends HasID>({
  getArcColor,
  getItemDetail,
  createHighlighter,
  items,
  onMouseEnter,
  onMouseLeave,
  radius,
  svgDimensions
}: Props<T>) {
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
        <SunburstSVG
          getColor={getArcColor}
          createHighlighter={createHighlighter}
          isNodeClickable={() => false}
          items={items}
          // onClick={onClick}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
          radius={radius}
          svgDimension={svgDimensions}
          getLabel={getItemDetail}
        />
      </div>
      <div className="detail">
        <label>{detail}</label>
      </div>
    </div >
  )
}
