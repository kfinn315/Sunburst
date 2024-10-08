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
  centerElement?: JSX.Element
  duration?: number
  getArcColor: (d: HierarchyRectangularNode<TDatum>) => string
  // highlighter?: IHighlighterWrapper<TDatum>
  isNodeClickable: (d: HierarchyRectangularNode<TDatum>) => boolean
  items: HierarchyRectangularNode<TDatum>[]
  onClick?: SunburstEvent<TDatum>
  onMouseEnter?: SunburstEvent<TDatum>
  onMouseLeave?: SunburstEvent<TDatum>
  radius: number
  highlighterFactory?: HighlighterFactory<HierarchyNode<TDatum>>
}

export default function SunburstView<TDatum extends HasID>(
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

  const gElementRef = useRef<SVGGElement | null>(null)

  let highlighter: Highlighter<HierarchyNode<TDatum>>;

  if (highlighterFactory) {
    highlighter = highlighterFactory.get(new RefQueryer<SVGGElement>(gElementRef))
  }

  function getSunburstViewController() {
    function mouseEnterHandler(
      event: MouseEvent,
      d: HierarchyNode<TDatum>
    ): void {
      highlighter?.highlight(d)
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

    const arcs: Arcs = new ArcGroup(radius)

    function getNodeID(d: HierarchyRectangularNode<TDatum>): number {
      return d.data.id
    }

    return new SunburstViewController<TDatum>(gElementRef, {
      duration,
      arcs,
      onClick: clickHandler,
      onMouseEnter: mouseEnterHandler,
      onMouseLeave: mouseLeaveHandler,
      getArcColor,
      getMouseArcPathClass,
      getNodeID
    })
  }

  const controller = useMemo(getSunburstViewController,
    [radius, duration, onMouseEnter, onMouseLeave, onClick, getArcColor, highlighterFactory, isNodeClickable])

  useLayoutEffect(() => {
    controller.initialize(items)
  }, [items, controller])

  return (
    <g ref={gElementRef}
      preserveAspectRatio="xMinYMin meet"
      transform={`translate(${String(radius)},${String(radius)})`}
    >
      {/* <g className="arc"></g> */}
      {/* <g className="mousearc"></g> */}
      {centerElement}
    </g>
  )
}
