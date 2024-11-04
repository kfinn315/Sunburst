import './AsyncSunburst.css'

import { HierarchyNode, HierarchyRectangularNode } from 'd3'
import { useEffect, useMemo, useRef } from 'react'

import { HasID, MutableRefElement, SunburstItemNode } from '../../Types'
import { DefaultArcs } from '../../Services/Arcs'
import { CreateHighlighter } from '../../Services/Highlighter'
import { D3SunburstView, SunburstEvent } from '../../Services/D3SunburstView'
import UnscaledSVG from '../UnscaledSVG'
import { D3SunburstViewProps } from '../../Services/D3SunburstView/D3SunburstView'
import { DataProvider, GetHierarachyNodeDescendants } from './Types';
import { getColorScale } from '../../Utils'

export interface AsyncSunburstProps<TDatum> {
  centerElement?: JSX.Element
  dataProvider: DataProvider<TDatum[]>
  getArcColor: (d: HierarchyRectangularNode<TDatum>) => string
  highlighterFactory?: CreateHighlighter<HierarchyNode<TDatum>>
  isNodeClickable: boolean | ((d: HierarchyRectangularNode<TDatum>) => boolean)
  onClick?: SunburstEvent<TDatum>
  onMouseEnter?: SunburstEvent<TDatum>
  onMouseLeave?: SunburstEvent<TDatum>
  radius: number
  transitionDuration?: number
  getHierarchyNodeDescendants: GetHierarachyNodeDescendants<TDatum>
}

export default function AsyncSunburst<TDatum extends HasID & { size: number }>(
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
    getHierarchyNodeDescendants

  } = props
  const gRef: MutableRefElement<SVGGElement> = useRef<SVGGElement | null>(null)
  const highlighter = highlighterFactory?.(gRef)

  const svgDimension = 2 * radius

  const d3SunburstView = useMemo(() => new D3SunburstView<TDatum>(gRef), [])

  const colorGradient: [string, string] = useMemo(() => (['orange', 'blue']), [])

  useEffect(() => {
    const d3Props: D3SunburstViewProps<SunburstItemNode> = {
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
      getNodeID: function (d: HierarchyRectangularNode<TDatum>): number {
        return d.data.id
      },
    }

    // color arcs based on id value, with a color scale based on ``colorGradient`` removing id === -1. id === -1 gets unknownColor.
    function addColorProperty(colorGradient: [string, string], unknownColor: string, items: TDatum[]) {
      const getColor = (item: TDatum) => item.id
      const colorScale = getColorScale<TDatum>(items.filter(x => x.id !== -1), getColor, colorGradient, unknownColor)
      console.log(colorScale.domain())
      return items.map(item => ({ ...item, color: colorScale(item.id == -1 ? NaN : getColor(item)) }))
    }

    dataProvider.get().then(response => {
      if (!response.success) {
        fail(response.error)
      }
      const data = addColorProperty(colorGradient, 'black', response.data)
      console.log(data)
      const rootNode: SunburstItemNode = { id: 0, name: 'root', children: data }

      const hierarchyNodeDescendants = getHierarchyNodeDescendants(rootNode, radius)
      d3SunburstView.layout(hierarchyNodeDescendants, d3Props)

    }).catch((reason) => {
      console.error(reason)
    })
  }, [colorGradient, d3SunburstView, dataProvider, getArcColor, getHierarchyNodeDescendants, highlighter, isNodeClickable, onClick, onMouseEnter, onMouseLeave, radius, transitionDuration])

  return (
    <UnscaledSVG width={svgDimension} height={svgDimension}>
      <g ref={gRef} preserveAspectRatio="xMinYMin meet" transform={`translate(${String(radius)},${String(radius)})`}>
        {centerElement}
      </g>
    </UnscaledSVG>
  )
}
