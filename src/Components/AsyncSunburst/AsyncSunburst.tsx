import './AsyncSunburst.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useEffect, useMemo, useRef } from 'react'

import { HasID, MutableRefElement } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { HighlighterFactory } from '../../Services/Highlighter'
import { D3SunburstView, SunburstEvent } from '../../Services/D3SunburstView'
import { DataProvider } from './DataProvider'
import { getHierarchyNodes } from '../../Utils'
import UnscaledSVG from '../UnscaledSVG'

export interface AsyncSunburstProps<TDatum> {
  centerElement?: JSX.Element
  dataProvider: DataProvider<TDatum>
  transitionDuration?: number
  getArcColor: (d: HierarchyRectangularNode<TDatum>) => string
  isNodeClickable: boolean | ((d: HierarchyRectangularNode<TDatum>) => boolean)
  onClick?: SunburstEvent<TDatum>
  onMouseEnter?: SunburstEvent<TDatum>
  onMouseLeave?: SunburstEvent<TDatum>
  radius: number
  // svgDimension: number,
  highlighterFactory?: HighlighterFactory<HierarchyNode<TDatum>>
}

export default function AsyncSunburst<TDatum extends HasID>(
  props: AsyncSunburstProps<TDatum>,
): JSX.Element {
  const {
    centerElement,
    dataProvider,
    transitionDuration = 100,
    getArcColor,
    highlighterFactory,
    isNodeClickable,
    onClick,
    onMouseEnter,
    onMouseLeave,
    radius = 1000,
    // svgDimension,
  } = props
  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)
  const highlighter = highlighterFactory?.get(gRef)

  const svgDimension = 2 * radius

  const d3SunburstView = useMemo(() => new D3SunburstView(gRef, {
    transitionDuration,
    arcs: new DefaultArcs(radius),
    onClick: (event: MouseEvent, d: HierarchyNode<TDatum>): void => {
      onClick?.(event, d)
    },
    onMouseEnter: (event: MouseEvent, d: HierarchyNode<TDatum>): void => {
      highlighter?.add(d)
      onMouseEnter?.(event, d)
    },
    onMouseLeave: (event: MouseEvent, d: HierarchyNode<TDatum>): void => {
      highlighter?.clear()
      onMouseLeave?.(event, d)
    },
    getArcColor,
    getMouseArcPathClass: (d: HierarchyRectangularNode<TDatum>): string | null => {
      if (typeof (isNodeClickable) == "boolean") {
        return false;
      }

      return isNodeClickable(d) ? 'clickable' : null
    },
    getNodeID: (d: HierarchyRectangularNode<TDatum>): number => {
      return d.data.id
    },
  }), [transitionDuration, getArcColor, highlighter, isNodeClickable, onClick, onMouseEnter, onMouseLeave, radius])

  useEffect(() => {
    const partitionSize = [2 * Math.PI, Math.pow(radius, 2)]

    console.info('useEffect running')

    dataProvider.get().then((response) => {
      if (!response.success) {
        fail(response.error)
      }

      const hierarchyNodes = getHierarchyNodes(response.data, partitionSize)

      d3SunburstView.layout(hierarchyNodes)

    }).catch((reason) => {
      console.error(reason)
    })

  }, [d3SunburstView, dataProvider, radius])

  return (
    <UnscaledSVG width={svgDimension} height={svgDimension}>
      <g ref={gRef}
        preserveAspectRatio="xMinYMin meet"
        transform={`translate(${String(radius)},${String(radius)})`}
      >
        {centerElement}
      </g>
    </UnscaledSVG>
  )
}
