import './Sunburst.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useLayoutEffect, useMemo, useRef } from 'react'

import { SunburstViewController } from './SunburstViewController'
import { SunburstEvent } from './Types'
import { HasID, MutableRefElement } from '../../Types'
import { DefaultArcProvider } from '../../Services/Arcs'
import { HighlighterFactory } from '../../Services/Highlighter'

export interface SunburstViewProps<TDatum> {
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
  props: SunburstViewProps<TDatum>,
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

  const gElementRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)

  const highlighter = highlighterFactory?.get(gElementRef)

  function mouseEnterHandler(
    event: MouseEvent,
    d: HierarchyNode<TDatum>
  ): void {
    highlighter?.add(d)
    onMouseEnter?.(event, d)
  }

  function mouseLeaveHandler(
    event: MouseEvent,
    d: HierarchyNode<TDatum>
  ): void {
    highlighter?.clear()
    onMouseLeave?.(event, d)
  }

  function clickHandler(
    event: MouseEvent,
    d: HierarchyNode<TDatum>
  ): void {
    onClick?.(event, d)
  }

  function getMouseArcPathClass(
    d: HierarchyRectangularNode<TDatum>
  ): string | null {
    return isNodeClickable(d) ? 'clickable' : null
  }

  const arcs = new DefaultArcProvider(radius)

  function getNodeID(d: HierarchyRectangularNode<TDatum>): number {
    return d.data.id
  }

  const controller = useMemo(() => new SunburstViewController<TDatum>(gElementRef, {
    duration,
    arcs,
    onClick: clickHandler,
    onMouseEnter: mouseEnterHandler,
    onMouseLeave: mouseLeaveHandler,
    getArcColor,
    getMouseArcPathClass,
    getNodeID
  }), [radius, duration, onMouseEnter, onMouseLeave, onClick, getArcColor, highlighterFactory, isNodeClickable])

  useLayoutEffect(() => {
    controller.initialize(items)
  }, [items, controller])

  return (
    <g ref={gElementRef}
      preserveAspectRatio="xMinYMin meet"
      transform={`translate(${String(radius)},${String(radius)})`}
    >
      {centerElement}
    </g>
  )
}
