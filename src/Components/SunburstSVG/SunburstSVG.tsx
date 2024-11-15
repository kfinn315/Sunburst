import './SunburstSVG.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useEffect, useMemo, useRef } from 'react'

import { MutableRefElement, RectangleDimensions, SunburstItemWithChildren, SunburstEvent } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { CreateHighlighter } from '../../Services/Highlighter'
import { D3SunburstView, D3SunburstViewProps } from '../../Services/D3SunburstView'
import UnscaledSVG from '../UnscaledSVG'
import { CreateHighlighter } from '../../Services/Highlighter/Types';

export interface Props<T> {
  // isNodeClickable: boolean | ((d: HierarchyRectangularNode<T>) => boolean)
  // createHierarchyRectangularNodes: GetHierarachyNodeDescendants<T>
  createHighlighter?: CreateHighlighter<HierarchyNode<T>>
  getColor?: (d: HierarchyRectangularNode<T>) => string
  getID?: (d: HierarchyRectangularNode<T>) => string | number
  getLabel?: (d: HierarchyRectangularNode<T>) => string | undefined
  items: HierarchyRectangularNode<T>[] | undefined
  onClick?: SunburstEvent<T>
  onMouseEnter?: SunburstEvent<T>
  onMouseLeave?: SunburstEvent<T>
  radius: number
  svgDimension?: RectangleDimensions
  transitionDuration?: number
}

/**
 * Sunburst wrapped in an `UnscaledSVG` component
 *
 */
export default function SunburstSVG<T extends SunburstItemWithChildren = SunburstItemWithChildren>(
  props: Props<T>,
): JSX.Element {
  const {
    // isNodeClickable,
    createHierarchyRectangularNodes,
    createHighlighter,
    getColor,
    getID,
    getLabel,
    items,
    onClick,
    onMouseEnter,
    onMouseLeave,
    radius = 1000,
    svgDimension,
    transitionDuration = 100,
  } = props

  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)
  const d3SunburstView = useMemo(() => new D3SunburstView<T>(gRef), [])

  const highlighter = createHighlighter?.(gRef)
  const svgDimensionEdited: RectangleDimensions = svgDimension ?? { width: 2 * radius, height: 2 * radius }

  const viewProps: D3SunburstViewProps<T> = useMemo(() => ({
    transitionDuration,
    arcs: new DefaultArcs(radius),
    onClick: (event, d): void => {
      onClick?.(event, d)
    },
    onMouseEnter: (event, d): void => {
      highlighter?.add(d)
      onMouseEnter?.(event, d)
    },
    onMouseLeave: (event, d): void => {
      highlighter?.clear()
      onMouseLeave?.(event, d)
    },
    getColor: getColor ?? function (d) { return d.data.color ?? 'transparent' },
    // getMouseArcPathClass: (d) => {
    //   if (typeof (isNodeClickable) == "boolean") {
    //     return isNodeClickable ? 'clickable' : null;
    //   }

    //   return isNodeClickable(d) ? 'clickable' : null
    // },
    getID: getID ?? function (d): number {
      return d.data.id
    },
    getLabel: getLabel ?? function (d) { return d.data.name }
  }), [getColor, getID, getLabel, highlighter, onClick, onMouseEnter, onMouseLeave, radius, transitionDuration])

  useEffect(() => {
    if (items !== undefined) {
      // const hierarchyNodes = createHierarchyRectangularNodes(items, radius)
      d3SunburstView.layout(items, viewProps)
    }

  }, [createHierarchyRectangularNodes, d3SunburstView, items, radius, viewProps])

  return (
    <UnscaledSVG width={svgDimensionEdited.width} height={svgDimension.height}>
      <g ref={gRef} preserveAspectRatio="xMinYMin meet" transform={`translate(${String(svgDimensionEdited.width / 2)},${String(svgDimensionEdited.height / 2)})`}></g>
    </UnscaledSVG>
  )
}
