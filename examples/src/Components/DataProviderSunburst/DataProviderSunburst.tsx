import "./DataProviderSunburst.css";

import { useCallback, useEffect, useState } from "react";
import { HierarchyNode, HierarchyRectangularNode, hierarchy } from 'd3';

import { DataProvider, SunburstItemNode, getCirclePartitionLayout, SunburstEvent, AncestorHighlighter, ErrorBanner, SunburstSVG } from "../../sunburstLibrary";

interface Props {
    dataProvider: DataProvider<HierarchyRectangularNode<SunburstItemNode>, number>
    onArcClick?: SunburstEvent<SunburstItemNode>
    onMouseEnter?: SunburstEvent<SunburstItemNode>
    onMouseLeave?: SunburstEvent<SunburstItemNode>
}

function getRectangularHierarchyNodes(hierarchicalData: SunburstItemNode, radius: number): HierarchyRectangularNode<SunburstItemNode>[] {
    const partitionLayout = getCirclePartitionLayout<SunburstItemNode>(radius);
    const rootHierarchyNode = hierarchy(hierarchicalData).sum(item => item.size).sort((nodeA, nodeB) => nodeA.data.size - nodeB.data.size);
    return partitionLayout(rootHierarchyNode).descendants();
}

function DataProviderSunburst({ dataProvider, onArcClick, onMouseEnter, onMouseLeave }: Props) {
    const [items, setItems] = useState<SunburstItemNode | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const getArcColor = useCallback((d: HierarchyRectangularNode<SunburstItemNode>) => { return d.data?.color ?? 'transparent' }, [])

    const createHighlighter = useCallback((ref) => new AncestorHighlighter<SunburstItemNode>(ref,
        {
            get(item) { return `.arcs path[data-id="${String(item.id)}"]`; },
            getAll() { return '.arcs path'; }
        },
        'highlight'), [])

    const getData = useCallback(function (request?: { id: number, level: number }) {
        dataProvider.get(request).then(response => {
            if (!response) {
                throw "Empty response from dataProvider.get()";
            }
            setItems(response);
        }).catch((reason: Error | string) => {
            console.error(reason);
            if (typeof (reason) === "string") {
                throw new Error(reason)
            } else {
                throw reason
            }
        });
    }, [dataProvider])

    const clickHandler = (event: MouseEvent, d: HierarchyNode<SunburstItemNode>): void => {
        try {
            getData({ id: d.data.id, depth: d.depth });
        } catch (reason) {
            console.error(reason)
        }

        onArcClick?.(event, d)
    };

    useEffect(() => {
        try {
            getData();
        } catch (reason) {
            console.error(reason)
            setError(reason.message)
        }
    }, [dataProvider, getData])

    return (
        (error && <ErrorBanner message={error} />) ||
        <SunburstSVG<SunburstItemNode>
            items={items}
            transitionDuration={1000}
            isNodeClickable={true}
            getArcColor={getArcColor}
            highlighterFactory={createHighlighter}
            radius={150}
            svgDimension={{ height: 700, width: 700 }}
            createRectangularHierarchyNodes={getRectangularHierarchyNodes}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={clickHandler}
        />
    )
}

export default DataProviderSunburst
