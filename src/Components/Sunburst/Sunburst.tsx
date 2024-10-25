import './Sunburst.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useCallback, useLayoutEffect, useRef } from 'react'

// import { D3SunburstView } from '../D3SunburstView'
import { SunburstEvent } from './Types'
import { HasID, MutableRefElement } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { HighlighterFactory } from '../../Services/Highlighter'
import { d3SunburstView } from '../D3SunburstView/D3SunburstView'

export interface SunburstProps<TDatum> {
  centerElement?: JSX.Element
  duration?: number
  getArcColor: (d: HierarchyRectangularNode<TDatum>) => string
  isNodeClickable: (d: HierarchyRectangularNode<TDatum>) => boolean
  items: HierarchyRectangularNode<TDatum>[]
  onClick?: SunburstEvent<TDatum>
  onMouseEnter?: SunburstEvent<TDatum>
  onMouseLeave?: SunburstEvent<TDatum>
  radius: number
  highlighterFactory?: HighlighterFactory<HierarchyNode<TDatum>>
}

export default function Sunburst<TDatum extends HasID>(
  props: SunburstProps<TDatum>,
): JSX.Element {
  const {
    centerElement,
    duration = 100,
    getArcColor,
    isNodeClickable,
    items,
    onClick,
    onMouseEnter,
    onMouseLeave,
    highlighterFactory,
    radius
  } = props

  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)

  const highlighter = highlighterFactory?.get(gRef)

  const mouseEnterHandler = useCallback((
    event: MouseEvent,
    d: HierarchyNode<TDatum>
  ): void => {
    highlighter?.add(d)
    onMouseEnter?.(event, d)
  }, [highlighter, onMouseEnter])

  const mouseLeaveHandler = useCallback((
    event: MouseEvent,
    d: HierarchyNode<TDatum>
  ): void => {
    highlighter?.clear()
    onMouseLeave?.(event, d)
  }, [highlighter, onMouseLeave])

  const clickHandler = useCallback((
    event: MouseEvent,
    d: HierarchyNode<TDatum>
  ): void => {
    onClick?.(event, d)
  }, [onClick])

  const getMouseArcPathClass = useCallback((
    d: HierarchyRectangularNode<TDatum>
  ): string | null => {
    return isNodeClickable(d) ? 'clickable' : null
  }, [isNodeClickable])

  const getNodeID = useCallback((d: HierarchyRectangularNode<TDatum>): number => {
    return d.data.id
  }, [])

  // const controller = useMemo(() => new D3SunburstView<TDatum>(gRef, {
  //   transitionDuration: duration,
  //   arcs: new DefaultArcs(radius),
  //   onClick: clickHandler,
  //   onMouseEnter: mouseEnterHandler,
  //   onMouseLeave: mouseLeaveHandler,
  //   getArcColor,
  //   getMouseArcPathClass,
  //   getNodeID
  // }), [duration, radius, clickHandler, mouseEnterHandler, mouseLeaveHandler, getArcColor, getMouseArcPathClass, getNodeID])

  useLayoutEffect(() => {
    // controller.layout(items)
    d3SunburstView(gRef, items, {
      transitionDuration: duration,
      arcs: new DefaultArcs(radius),
      onClick: clickHandler,
      onMouseEnter: mouseEnterHandler,
      onMouseLeave: mouseLeaveHandler,
      getArcColor,
      getMouseArcPathClass,
      getNodeID
    })
  }, [items, duration, radius, clickHandler, mouseEnterHandler, mouseLeaveHandler, getArcColor, getMouseArcPathClass, getNodeID])

  return (
    <g ref={gRef}
      preserveAspectRatio="xMinYMin meet"
      transform={`translate(${String(radius)},${String(radius)})`}
    >
      {centerElement}
    </g>
  )
}
