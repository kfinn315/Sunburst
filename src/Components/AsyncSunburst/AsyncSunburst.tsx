import './AsyncSunburst.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { MutableRefElement, RectangleDimensions, SunburstItemNode } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { CreateHighlighter } from '../../Services/Highlighter'
import { D3SunburstView, D3SunburstViewProps, SunburstEvent } from '../../Services/D3SunburstView'
import UnscaledSVG from '../UnscaledSVG'
import { DataProvider, GetHierarachyNodeDescendants } from './Types';
import ErrorBanner from './ErrorBanner'

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
  createRectangularHierarchyNodes: GetHierarachyNodeDescendants<TDatum>
  svgDimension?: RectangleDimensions
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
    createRectangularHierarchyNodes,
    svgDimension

  } = props
  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)
  const highlighter = highlighterFactory?.(gRef)

  const d3SunburstView = useMemo(() => new D3SunburstView<TDatum>(gRef), [])

  const svgDimensionEdited: RectangleDimensions = svgDimension ?? { width: 2 * radius, height: 2 * radius }

  const [error, setError] = useState<string | undefined>(undefined)

  const requestData = useCallback(function (props: D3SunburstViewProps<TDatum>) {
    dataProvider.get().then(response => {
      if (!response) {
        throw "Empty response from dataProvider.get()"
      }

      const hierarchyNodes = createRectangularHierarchyNodes(response.data, radius)
      d3SunburstView.layout(hierarchyNodes, props)

    }).catch((reason: Error) => {
      console.error(reason)
      setError(reason.message)
    })
  }, [d3SunburstView, dataProvider, createRectangularHierarchyNodes, radius])

  useEffect(() => {

    const props: D3SunburstViewProps<TDatum> = {
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
          return isNodeClickable ? 'clickable' : null;
        }

        return isNodeClickable(d) ? 'clickable' : null
      },
      getNodeID: function (d: HierarchyRectangularNode<TDatum>): number {
        return d.data.id
      },
      getText: (d) => { return d.data.name }
    }

    requestData(props)
  }, [getArcColor, requestData, highlighter, isNodeClickable, onClick, onMouseEnter, onMouseLeave, radius, transitionDuration])

  return (
    <>{
      error && <ErrorBanner message={error} /> ||
      <UnscaledSVG width={svgDimensionEdited.width} height={svgDimension.height}>
        <g ref={gRef} preserveAspectRatio="xMinYMin meet" transform={`translate(${String(svgDimension.width / 2)},${String(svgDimension.height / 2)})`}>{centerElement}</g>
      </UnscaledSVG>
    }</>
  )
}
