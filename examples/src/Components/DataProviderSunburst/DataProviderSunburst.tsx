import "./DataProviderSunburst.css";

import { useCallback, useEffect, useState } from "react";
import { HierarchyNode, HierarchyRectangularNode, hierarchy } from 'd3';

import { DataProvider, SunburstItemWithChildren, getCirclePartitionLayout, SunburstEvent, ErrorBanner, SunburstSVG } from "../../sunburstLibrary";
import { createArcHighlighter } from "../../Utils/createArcHighlighter";

interface Props {
    dataProvider: DataProvider<HierarchyRectangularNode<SunburstItemWithChildren>, number>
    onArcClick?: SunburstEvent<SunburstItemWithChildren>
    onMouseEnter?: SunburstEvent<SunburstItemWithChildren>
    onMouseLeave?: SunburstEvent<SunburstItemWithChildren>
    initialID?: number
}

function getHierarchyRectangularNodes(hierarchicalData: SunburstItemWithChildren, radius: number): HierarchyRectangularNode<SunburstItemWithChildren>[] {
    const partitionLayout = getCirclePartitionLayout<SunburstItemWithChildren>(radius);
    const rootHierarchyNode = hierarchy(hierarchicalData).sum(item => item.size).sort((nodeA, nodeB) => nodeA.data.size - nodeB.data.size);
    return partitionLayout(rootHierarchyNode).descendants();
}

/**
 * Wrapped `SunburstSVG<SunburstItemNode>` component that uses a DataProvider to load data.
 */
function DataProviderSunburst({ dataProvider, onArcClick, onMouseEnter, onMouseLeave, initialID }: Props) {
    const [items, setItems] = useState<HierarchyRectangularNode<SunburstItemWithChildren>[] | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)

    const createHighlighter = useCallback(createArcHighlighter, [])
    const radius = 150
    const getData = useCallback(function (request?: { id: number, depth: number }) {
        dataProvider.get(request).then(response => {
            if (!response) {
                throw "Empty response from dataProvider.get()";
            }
            setItems(getHierarchyRectangularNodes(response, radius));
        }).catch((reason: Error | string) => {
            console.error(reason);
            if (typeof (reason) === "string") {
                throw new Error(reason)
            } else {
                throw reason
            }
        });
    }, [dataProvider])

    const clickHandler = useCallback((event: MouseEvent, d: HierarchyNode<SunburstItemWithChildren>): void => {
        try {
            getData({ id: d.data.id, depth: d.depth });
        } catch (reason) {
            console.error(reason)
        }

        onArcClick?.(event, d)
    }, [getData, onArcClick]);

    useEffect(() => {
        try {
            getData({ id: initialID, depth: 0 });
        } catch (reason) {
            console.error(reason)
            setError(reason.message)
        }
    }, [initialID, dataProvider, getData])

    return (
        (error && <ErrorBanner message={error} />) ||
        <SunburstSVG<SunburstItemWithChildren>
            items={items}
            transitionDuration={1000}
            isNodeClickable={true}
            createHighlighter={createHighlighter}
            radius={radius}
            svgDimension={{ height: 700, width: 700 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={clickHandler}
        />
    )
}

export default DataProviderSunburst
