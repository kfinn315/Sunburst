import './AsyncSunburst.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useEffect, useMemo, useRef } from 'react'

import { MutableRefElement, SunburstItemNode } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { CreateHighlighter } from '../../Services/Highlighter'
import { D3SunburstView, SunburstEvent } from '../../Services/D3SunburstView'
import UnscaledSVG from '../UnscaledSVG'
import { D3SunburstViewProps } from '../../Services/D3SunburstView/D3SunburstView'
import { DataProvider, GetHierarachyNodeDescendants } from './Types';

export interface AsyncSunburstProps<TDatum> {
  centerElement?: JSX.Element
  dataProvider: DataProvider<TDatum>
  getArcColor: (d: HierarchyRectangularNode<TDatum>) => string
  highlighterFactory?: CreateHighlighter<HierarchyNode<TDatum>>
  isNodeClickable: boolean | ((d: HierarchyRectangularNode<TDatum>) => boolean)
  onClick?: SunburstEvent<TDatum>
  onMouseEnter?: SunburstEvent<TDatum>
  onMouseLeave?: SunburstEvent<TDatum>
  radius: number
  transitionDuration?: number
  getRectangularHierarchyNodes: GetHierarachyNodeDescendants<TDatum>
}

/**
 * Sunburst Component utilizing a DataProvider to provide data asynchronously
 *
 */
export default function AsyncSunburst<TDatum extends SunburstItemNode = SunburstItemNode>(
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
    getRectangularHierarchyNodes,

  } = props
  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)
  const highlighter = highlighterFactory?.(gRef)

  const d3SunburstView = useMemo(() => new D3SunburstView<TDatum>(gRef), [])

  const svgDimension = 2 * radius

  useEffect(() => {
    const d3Props: D3SunburstViewProps<TDatum> = {
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
          return isNodeClickable ? 'clickable' : false;
        }

        return isNodeClickable(d) ? 'clickable' : null
      },
      getNodeID: function (d: HierarchyRectangularNode<TDatum>): number {
        return d.data.id
      },
    }

    dataProvider.get().then(response => {
      if (!response) {
        fail("Empty response from dataProvider.get()")
      }
      if (!response.success) {
        fail(response.error)
      }

      const hierarchyNodes = getRectangularHierarchyNodes(response.data, radius)
      d3SunburstView.layout(hierarchyNodes, d3Props)

    }).catch((reason) => {
      console.error(reason)
    })
  }, [d3SunburstView, dataProvider, getArcColor, getRectangularHierarchyNodes, highlighter, isNodeClickable, onClick, onMouseEnter, onMouseLeave, radius, transitionDuration])

  return (
    <UnscaledSVG width={svgDimension} height={svgDimension}>
      <g ref={gRef} preserveAspectRatio="xMinYMin meet" transform={`translate(${String(radius)},${String(radius)})`}>
        {centerElement}
      </g>
    </UnscaledSVG>
  )
}
