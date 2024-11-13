import './SunburstSVG.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useEffect, useMemo, useRef } from 'react'

import { MutableRefElement, RectangleDimensions, SunburstItemNode } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { CreateHighlighter } from '../../Services/Highlighter'
import { D3SunburstView, D3SunburstViewProps, SunburstEvent } from '../../Services/D3SunburstView'
import UnscaledSVG from '../UnscaledSVG'
import { GetHierarachyNodeDescendants } from './Types';

export interface Props<TDatum> {
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
  items: TDatum[] | undefined
}

/**
 * Sunburst wrapped in an `UnscaledSVG` component
 *
 */
export default function SunburstSVG<TDatum extends SunburstItemNode = SunburstItemNode>(
  props: Props<TDatum>,
): JSX.Element {
  const {
    createRectangularHierarchyNodes,
    getArcColor,
    highlighterFactory,
    isNodeClickable,
    items,
    onClick,
    onMouseEnter,
    onMouseLeave,
    radius = 1000,
    svgDimension,
    transitionDuration = 100,
  } = props

  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)
  const highlighter = highlighterFactory?.(gRef)
  const svgDimensionEdited: RectangleDimensions = svgDimension ?? { width: 2 * radius, height: 2 * radius }

  const d3SunburstView = useMemo(() => new D3SunburstView<TDatum>(gRef), [])

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

    if (items !== undefined) {
      const hierarchyNodes = createRectangularHierarchyNodes(items, radius)
      d3SunburstView.layout(hierarchyNodes, props)
    }

  }, [getArcColor, highlighter, isNodeClickable, onClick, onMouseEnter, onMouseLeave, radius, transitionDuration, createRectangularHierarchyNodes, items, d3SunburstView])

  return (
    <UnscaledSVG width={svgDimensionEdited.width} height={svgDimension.height}>
      <g ref={gRef} preserveAspectRatio="xMinYMin meet" transform={`translate(${String(svgDimension.width / 2)},${String(svgDimension.height / 2)})`}></g>
    </UnscaledSVG>
  )
}
