import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'

import { HasID, MutableRefElement } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { D3SunburstView, SunburstEvent } from '../../Services/D3SunburstView'
import { CreateHighlighter } from '../../Services/Highlighter'

export interface SunburstProps<TDatum> {
  centerElement?: JSX.Element
  transitionDuration?: number
  getArcColor: (d: HierarchyRectangularNode<TDatum>) => string
  isNodeClickable: (d: HierarchyRectangularNode<TDatum>) => boolean
  items: HierarchyRectangularNode<TDatum>[]
  onClick?: SunburstEvent<TDatum>
  onMouseEnter?: SunburstEvent<TDatum>
  onMouseLeave?: SunburstEvent<TDatum>
  radius: number
  highlighterFactory?: CreateHighlighter<HierarchyNode<TDatum>>
}

export default function Sunburst<TDatum extends HasID>(
  props: SunburstProps<TDatum>,
): JSX.Element {
  const {
    centerElement,
    getArcColor,
    highlighterFactory,
    isNodeClickable,
    items,
    onClick,
    onMouseEnter,
    onMouseLeave,
    radius,
    transitionDuration = 100,
  } = props

  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)

  const d3SunburstView = useMemo(() => new D3SunburstView<TDatum>(gRef), [])

  const highlighter = highlighterFactory?.(gRef)

  const mouseEnterHandler = useCallback((event: MouseEvent, d: HierarchyNode<TDatum>): void => {
    highlighter?.add(d)
    onMouseEnter?.(event, d)
  }, [highlighter, onMouseEnter])

  const mouseLeaveHandler = useCallback((event: MouseEvent, d: HierarchyNode<TDatum>): void => {
    highlighter?.clear()
    onMouseLeave?.(event, d)
  }, [highlighter, onMouseLeave])

  const clickHandler = useCallback((event: MouseEvent, d: HierarchyNode<TDatum>): void => {
    onClick?.(event, d)
  }, [onClick])

  const getMouseArcPathClass = useCallback((d: HierarchyRectangularNode<TDatum>): string | null => {
    return isNodeClickable(d) ? 'clickable' : null
  }, [isNodeClickable])

  const getNodeID = useCallback((d: HierarchyRectangularNode<TDatum>): number => {
    return d.data.id
  }, [])

  useLayoutEffect(() => {
    d3SunburstView.layout(items, {
      arcs: new DefaultArcs(radius),
      onClick: clickHandler,
      onMouseEnter: mouseEnterHandler,
      onMouseLeave: mouseLeaveHandler,
      getArcColor,
      getMouseArcPathClass,
      getNodeID,
      transitionDuration,
    })
  }, [clickHandler, d3SunburstView, getArcColor, getMouseArcPathClass, getNodeID, items, mouseEnterHandler, mouseLeaveHandler, radius, transitionDuration])

  return (
    <g ref={gRef} preserveAspectRatio="xMinYMin meet" transform={`translate(${String(radius)},${String(radius)})`}>
      {centerElement}
    </g>
  )
}
