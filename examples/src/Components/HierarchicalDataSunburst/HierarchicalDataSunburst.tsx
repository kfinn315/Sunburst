import "./HierarchicalDataSunburst.css"

import { hierarchy, HierarchyNode, HierarchyRectangularNode, scaleLinear } from 'd3';

import { hierarchicalData } from './hierarchicalData';
import { RectangleDimensions, SunburstItemWithChildren, SunburstContainer, getCirclePartitionLayout } from "../../sunburstLibrary";
import { createArcHighlighter } from "../../Utils/createArcHighlighter";

function HierarchicalDataSunburst() {
    const svgSideLength = 1400

    const svgDimensions: RectangleDimensions = {
        width: svgSideLength,
        height: svgSideLength,
    }

    const radius = svgSideLength / 2;
    const hierarchyNodes = getHierarchyNodes(radius, hierarchicalData);

    function getHierarchyNodes(radius: number, hierarchicalData: SunburstItemWithChildren): HierarchyRectangularNode<SunburstItemWithChildren>[] {
        const partitionLayout = getCirclePartitionLayout<SunburstItemWithChildren>(radius)
        const rootHierarchyNode = hierarchy(hierarchicalData).sum(d => d.size).sort((a, b) => { return a.data.size - b.data.size; });
        return partitionLayout(rootHierarchyNode).descendants();
    }

    const centerColor = 'blue'
    const colorGradient: [string, string] = ['blue', 'yellow']
    const colorScale = scaleLinear(
        [0, 1000],
        colorGradient
    )
    const getArcColor = (d: HierarchyRectangularNode<SunburstItemWithChildren>) =>
        d.data.color ? colorScale(d.data.color) : centerColor

    function getItemDetail(item: HierarchyNode<SunburstItemWithChildren>): string {
        return item
            .ancestors()
            .map((x) => x.data.name ?? '?')
            .reverse()
            .slice(1) //to remove "root"
            .join('.')
    }

    return (<>
        <SunburstContainer<SunburstItemWithChildren>
            getArcColor={getArcColor}
            getItemDetail={getItemDetail}
            items={hierarchyNodes}
            radius={radius}
            svgDimensions={svgDimensions}
            createHighlighter={createArcHighlighter}
        />
        <div className="data">
            <h2>Data</h2>
        </div>
    </>
    )
}

export default HierarchicalDataSunburst
