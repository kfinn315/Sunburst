import "./LiveCemeterySunburst.css";

import { useCallback } from "react";
import { HierarchyRectangularNode, hierarchy } from 'd3';

import { AsyncSunburst, DataProvider, SunburstItemNode, getCirclePartitionLayout, SunburstEvent, AncestorHighlighter } from "../../sunburstLibrary";

interface LiveCemeterySunburstProps {
    dataProvider: DataProvider<HierarchyRectangularNode<SunburstItemNode>>
    onArcClick?: SunburstEvent<SunburstItemNode>
    onMouseEnter?: SunburstEvent<SunburstItemNode>
    onMouseLeave?: SunburstEvent<SunburstItemNode>
}

function getRectangularHierarchyNodes(hierarchicalData: SunburstItemNode, radius: number): HierarchyRectangularNode<SunburstItemNode>[] {
    const partitionLayout = getCirclePartitionLayout<SunburstItemNode>(radius);
    const rootHierarchyNode = hierarchy(hierarchicalData).sum(item => item.size).sort((nodeA, nodeB) => nodeA.data.size - nodeB.data.size);
    return partitionLayout(rootHierarchyNode).descendants();
}

function LiveCemeterySunburst({ dataProvider, onArcClick, onMouseEnter, onMouseLeave }: LiveCemeterySunburstProps) {
    const getArcColor = useCallback((d: HierarchyRectangularNode<SunburstItemNode>) => { return d.data?.color ?? 'transparent' }, [])

    const createHighlighter = useCallback((ref) => new AncestorHighlighter<SunburstItemNode>(ref,
        {
            get(item) { return `.arcs path[data-id="${String(item.id)}"]`; },
            getAll() { return '.arcs path'; }
        },
        'highlight'), [])

    // document.querySelector('.sunburst-center')?.setHTMLUnsafe('<p>hi</p>')

    return (
        <AsyncSunburst<SunburstItemNode>
            transitionDuration={1000}
            dataProvider={dataProvider}
            isNodeClickable={true}
            getArcColor={getArcColor}
            highlighterFactory={createHighlighter}
            dataProvider={dataProvider}
            radius={150}
            svgDimension={{ height: 700, width: 700 }}
            createRectangularHierarchyNodes={getRectangularHierarchyNodes}
            // centerElement={center}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onArcClick}
        />
    )
}

export default LiveCemeterySunburst
