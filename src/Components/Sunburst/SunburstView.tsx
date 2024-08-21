import './Sunburst.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useLayoutEffect, useMemo, useRef } from 'react'

import { ArcGroup, Arcs } from '../../Services/Arcs'
import { SunburstViewController } from './SunburstViewController'
import { SunburstEvent } from './Types'
import { Highlighter, HighlighterFactory } from '../../Services/Highlighter'
import { HasID } from '../../Types'
import { RefQueryer } from '../../Utils/ElementProvider'

export interface SunburstViewProps<TDatum> {
  radius: number
  items: HierarchyRectangularNode<TDatum>[]
  getArcColor: (d: HierarchyRectangularNode<TDatum>) => string
  isArcClickable: (d: HierarchyRectangularNode<TDatum>) => boolean
  duration?: number
  onClick?: SunburstEvent<TDatum>
  onMouseEnter?: SunburstEvent<TDatum>
  onMouseLeave?: SunburstEvent<TDatum>
  centerElement?: JSX.Element
  highlighterFactory?: HighlighterFactory<HierarchyNode<TDatum>>
}

export default function SunburstView<TDatum extends HasID>(
  props: SunburstViewProps<TDatum>,
): JSX.Element {
  const {
    radius,
    items,
    getArcColor,
    isArcClickable,
    duration = 100,
    centerElement,
    onClick,
    onMouseEnter,
    onMouseLeave,
    highlighterFactory,
  } = props

  const gElementRef = useRef<SVGGElement | null>(null)
  const arcs: Arcs = new ArcGroup(radius)

  let highlighter: Highlighter<HierarchyNode<TDatum>>;

  if (highlighterFactory) {
    highlighter = highlighterFactory.get(new RefQueryer<SVGGElement>(gElementRef))
  }

  const controller = useMemo(() => {
    function mouseEnterHandler(
      event: MouseEvent,
      d: HierarchyNode<TDatum>,
    ): void {
      highlighter?.highlight(d)
      onMouseEnter?.(event, d)
    }

    function mouseLeaveHandler(
      event: MouseEvent,
      d: HierarchyNode<TDatum>,
    ): void {
      highlighter?.clear()
      onMouseLeave?.(event, d)
    }

    function clickHandler(
      event: MouseEvent,
      d: HierarchyNode<TDatum>,
    ): void {
      onClick?.(event, d)
    }

    function getMouseArcPathClass(
      d: HierarchyRectangularNode<TDatum>,
    ): string | null {
      return isArcClickable(d) ? 'clickable' : null
    }

    return new SunburstViewController<TDatum>(gElementRef, {
      duration,
      arcs,
      onClick: clickHandler,
      onMouseEnter: mouseEnterHandler,
      onMouseLeave: mouseLeaveHandler,
      getArcColor,
      getMouseArcPathClass,
      getNodeID: (d: HierarchyRectangularNode<TDatum>) => {
        return d.data.id
      },
    })
  }, [arcs, duration, highlighterFactory, onMouseEnter, onMouseLeave, onClick])

  useLayoutEffect(() => {
    controller.initialize(items)
  }, [items, controller])

  return (
    <g
      ref={gElementRef}
      preserveAspectRatio="xMinYMin meet"
      transform={`translate(${String(radius)},${String(radius)})`}
    >
      <g className="arc"></g>
      <g className="mousearc"></g>
      {centerElement}
    </g>
  )
}
