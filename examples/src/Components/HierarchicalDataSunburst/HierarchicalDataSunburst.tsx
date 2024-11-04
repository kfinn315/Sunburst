import "./HierarchicalDataSunburst.css"

import { hierarchy, HierarchyNode, HierarchyRectangularNode, scaleLinear } from 'd3';

import { hierarchicalData } from './hierarchicalData';
import { RectangleDimensions, SunburstItemNode, SunburstContainer, SunburstHighlighter, getCirclePartitionLayout } from "../../sunburstLibrary";

function HierarchicalDataSunburst() {
    const svgSideLength = 1400

    const svgDimensions: RectangleDimensions = {
        width: svgSideLength,
        height: svgSideLength,
    }

    const radius = svgSideLength / 2;
    const hierarchyNodes = getHierarchyNodes(radius, hierarchicalData);

    function getHierarchyNodes(radius: number, hierarchicalData: SunburstItemNode): HierarchyRectangularNode<SunburstItemNode>[] {
        const partitionLayout = getCirclePartitionLayout<SunburstItemNode>(radius)
        const rootHierarchyNode = hierarchy(hierarchicalData).sum(d => d.size).sort((a, b) => { return a.data.size - b.data.size; });
        return partitionLayout(rootHierarchyNode).descendants();
    }

    const centerColor = 'blue'
    const colorGradient: [string, string] = ['blue', 'yellow']
    const colorScale = scaleLinear(
        [0, 1000],
        colorGradient
    )
    const getArcColor = (d: HierarchyRectangularNode<SunburstItemNode>) =>
        d.data.color ? colorScale(d.data.color) : centerColor

    function getItemDetail(item: HierarchyNode<SunburstItemNode>): string {
        return item
            .ancestors()
            .map((x) => x.data.name ?? '?')
            .reverse()
            .slice(1) //to remove "root"
            .join('.')
    }

    return (<>
        <SunburstContainer<SunburstItemNode>
            getArcColor={getArcColor}
            getItemDetail={getItemDetail}
            items={hierarchyNodes}
            radius={radius}
            svgDimensions={svgDimensions}
            highlighterFactory={(ref) => new SunburstHighlighter(ref, 'highlight')}
        />
        <div className="data">
            <h2>Data</h2>
        </div>
    </>
    )
}

export default HierarchicalDataSunburst
